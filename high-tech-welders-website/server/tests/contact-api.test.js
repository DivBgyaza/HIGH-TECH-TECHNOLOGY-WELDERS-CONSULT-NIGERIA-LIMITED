import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../app.js';
import {SERVICE_TITLES} from '../validation/shared.js';

const validContact={
 name:'Amina Yusuf',
 email:'amina@example.com',
 phone:'+234 803 096 5094',
 service:SERVICE_TITLES[0],
 subject:'Welding enquiry',
 message:'Please contact me about a fabrication project.'
};

const recipientConfig={contactTo:'owner@example.com',contactCc:'office@example.com'};

async function withApi(options,callback){
 const app=createApp({contactRouteOptions:options});
 const server=app.listen(0,'127.0.0.1');
 await new Promise((resolve,reject)=>{
  server.once('listening',resolve);
  server.once('error',reject);
 });
 const {port}=server.address();

 try{
  await callback(`http://127.0.0.1:${port}`);
 }finally{
  await new Promise((resolve,reject)=>server.close(error=>error?reject(error):resolve()));
 }
}

function jsonPost(base,body,headers={}){
 return fetch(`${base}/api/contact`,{
  method:'POST',
  headers:{'Content-Type':'application/json',...headers},
  body:typeof body==='string'?body:JSON.stringify(body)
 });
}

test('valid contact submission sends once and returns a safe success',async()=>{
 const messages=[];
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async message=>{
   messages.push(message);
   return {messageId:'provider-secret-id',acceptedCount:1,rejectedCount:0};
  }}
 },async base=>{
  const response=await jsonPost(base,{...validContact,name:'  Amina Yusuf  '},{'X-Request-Id':'contact-test'});
  const body=await response.json();

  assert.equal(response.status,200);
  assert.equal(response.headers.get('x-request-id'),'contact-test');
  assert.deepEqual(body,{ok:true,message:'Your message has been received.',requestId:'contact-test'});
  assert.equal(messages.length,1);
  assert.equal(messages[0].to,recipientConfig.contactTo);
  assert.equal(messages[0].cc,recipientConfig.contactCc);
  assert.equal(messages[0].replyTo,validContact.email);
  assert.match(messages[0].text,/Name: Amina Yusuf/);
  assert.doesNotMatch(JSON.stringify(body),/owner@example\.com|provider-secret-id/);
 });
});

test('invalid submissions return 422 without sending mail',async()=>{
 let sends=0;
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async()=>{sends+=1;return {acceptedCount:1};}}
 },async base=>{
  const invalidBodies=[
   {...validContact,email:'invalid'},
   Object.fromEntries(Object.entries(validContact).filter(([key])=>key!=='subject')),
   {...validContact,service:'Unknown service'},
   {...validContact,unexpected:'value'}
  ];

  for(const invalidBody of invalidBodies){
   const response=await jsonPost(base,invalidBody);
   const body=await response.json();
   assert.equal(response.status,422);
   assert.equal(body.ok,false);
   assert.equal(body.message,'Please check the submitted information.');
   assert.equal(typeof body.requestId,'string');
  }
  assert.equal(sends,0);
 });
});

test('SMTP failure returns safe 503 without provider details',async()=>{
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async()=>{const error=new Error('SMTP password rejected by smtp.internal');error.code='EAUTH';throw error;}}
 },async base=>{
  const response=await jsonPost(base,validContact);
  const body=await response.json();
  assert.equal(response.status,503);
  assert.equal(body.message,'We could not send your message right now. Please try again later.');
  assert.doesNotMatch(JSON.stringify(body),/EAUTH|password|smtp\.internal|owner@example\.com/i);
 });
});

test('missing SMTP configuration returns safe 503 and server remains available',async()=>{
 await withApi({
  mailConfigProvider:()=>{throw new Error('Invalid SMTP configuration: SMTP_PASSWORD');},
  mailService:{send:async()=>{throw new Error('must not run');}}
 },async base=>{
  const response=await jsonPost(base,validContact);
  assert.equal(response.status,503);
  assert.doesNotMatch(await response.text(),/SMTP_PASSWORD/);

  const health=await fetch(`${base}/api/health`);
  assert.equal(health.status,200);
 });
});

test('contact limiter allows five attempts then returns safe 429 without sending',async()=>{
 let sends=0;
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async()=>{sends+=1;return {acceptedCount:1,rejectedCount:0};}}
 },async base=>{
  for(let attempt=1;attempt<=5;attempt+=1){
   assert.equal((await jsonPost(base,validContact)).status,200);
  }
  const limited=await jsonPost(base,validContact);
  const body=await limited.json();
  assert.equal(limited.status,429);
  assert.equal(body.message,'Too many submissions. Please try again later.');
  assert.equal(typeof body.requestId,'string');
  assert.equal(sends,5);
 });
});

test('unsupported content type, malformed JSON, and oversized JSON fail safely',async()=>{
 let sends=0;
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async()=>{sends+=1;return {acceptedCount:1};}}
 },async base=>{
  const unsupported=await fetch(`${base}/api/contact`,{method:'POST',headers:{'Content-Type':'text/plain'},body:'plain text'});
  assert.equal(unsupported.status,415);
  assert.equal((await unsupported.json()).message,'Content-Type must be application/json.');

  const malformed=await jsonPost(base,'{"name":');
  const malformedBody=await malformed.json();
  assert.equal(malformed.status,400);
  assert.equal(malformedBody.message,'Invalid JSON body');

  const oversized=await jsonPost(base,{payload:'x'.repeat(40000)});
  const oversizedBody=await oversized.json();
  assert.equal(oversized.status,413);
  assert.equal(oversizedBody.message,'Request body too large');
  assert.equal(sends,0);
 });
});
