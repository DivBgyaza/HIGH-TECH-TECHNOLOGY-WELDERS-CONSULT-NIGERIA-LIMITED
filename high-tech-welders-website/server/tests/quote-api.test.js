import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../app.js';
import {SERVICE_TITLES} from '../validation/shared.js';

const validQuote={
 name:'Ibrahim Musa',
 company:'Musa Engineering',
 email:'ibrahim@example.com',
 phone:'0803 123 4567',
 service:SERVICE_TITLES[1],
 location:'Katsina, Katsina State',
 budget:'₦500,000 – ₦2,000,000',
 preferredStartDate:'2026-10-15',
 message:'We require equipment manufacturing and installation.'
};

const recipientConfig={contactTo:'owner@example.com',contactCc:'office@example.com'};

async function withApi(options,callback){
 const app=createApp({quoteRouteOptions:options});
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
 return fetch(`${base}/api/quotes`,{
  method:'POST',
  headers:{'Content-Type':'application/json',...headers},
  body:typeof body==='string'?body:JSON.stringify(body)
 });
}

test('valid complete quote sends once and returns a safe success',async()=>{
 const messages=[];
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async message=>{
   messages.push(message);
   return {messageId:'provider-secret-id',acceptedCount:1,rejectedCount:0};
  }}
 },async base=>{
  const response=await jsonPost(base,{...validQuote,name:'  Ibrahim Musa  '},{'X-Request-Id':'quote-test'});
  const body=await response.json();

  assert.equal(response.status,200);
  assert.equal(response.headers.get('x-request-id'),'quote-test');
  assert.deepEqual(body,{ok:true,message:'Your quote request has been received.',requestId:'quote-test'});
  assert.equal(messages.length,1);
  assert.equal(messages[0].to,recipientConfig.contactTo);
  assert.equal(messages[0].cc,recipientConfig.contactCc);
  assert.equal(messages[0].replyTo,validQuote.email);
  assert.match(messages[0].text,/Name: Ibrahim Musa/);
  assert.match(messages[0].text,/Estimated Budget: ₦500,000 – ₦2,000,000/);
  assert.doesNotMatch(JSON.stringify(body),/owner@example\.com|provider-secret-id/);
 });
});

test('quote accepts omitted optional fields',async()=>{
 const messages=[];
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async message=>{messages.push(message);return {acceptedCount:1,rejectedCount:0};}}
 },async base=>{
  const {company,budget,preferredStartDate,...minimalQuote}=validQuote;
  const response=await jsonPost(base,minimalQuote);
  assert.equal(response.status,200);
  assert.equal(messages.length,1);
  assert.doesNotMatch(messages[0].text,/Company \/ Organization|Estimated Budget|Preferred Start Date/);
 });
});

test('invalid quote submissions return 422 without sending mail',async()=>{
 let sends=0;
 const invalidBodies=[
  {...validQuote,email:'invalid'},
  {...validQuote,service:'Unknown service'},
  {...validQuote,budget:'Any amount'},
  {...validQuote,preferredStartDate:'15/10/2026'},
  {...validQuote,preferredStartDate:'2026-02-30'},
  Object.fromEntries(Object.entries(validQuote).filter(([key])=>key!=='location')),
  {...validQuote,unexpected:'value'}
 ];

 for(const invalidBody of invalidBodies){
  await withApi({
   mailConfigProvider:()=>recipientConfig,
   mailService:{send:async()=>{sends+=1;return {acceptedCount:1};}}
  },async base=>{
   const response=await jsonPost(base,invalidBody);
   const body=await response.json();
   assert.equal(response.status,422);
   assert.equal(body.ok,false);
   assert.equal(body.message,'Please check the submitted information.');
   assert.equal(typeof body.requestId,'string');
  });
 }
 assert.equal(sends,0);
});

test('quote SMTP failure returns safe 503 without provider details',async()=>{
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async()=>{const error=new Error('SMTP password rejected by smtp.internal');error.code='EAUTH';throw error;}}
 },async base=>{
  const response=await jsonPost(base,validQuote);
  const body=await response.json();
  assert.equal(response.status,503);
  assert.equal(body.message,'We could not send your quote request right now. Please try again later.');
  assert.doesNotMatch(JSON.stringify(body),/EAUTH|password|smtp\.internal|owner@example\.com/i);
 });
});

test('missing SMTP configuration returns safe 503 and health stays available',async()=>{
 await withApi({
  mailConfigProvider:()=>{throw new Error('Invalid SMTP configuration: SMTP_PASSWORD');},
  mailService:{send:async()=>{throw new Error('must not run');}}
 },async base=>{
  const response=await jsonPost(base,validQuote);
  assert.equal(response.status,503);
  assert.doesNotMatch(await response.text(),/SMTP_PASSWORD/);
  assert.equal((await fetch(`${base}/api/health`)).status,200);
 });
});

test('quote limiter allows five attempts then returns safe 429 without sending',async()=>{
 let sends=0;
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async()=>{sends+=1;return {acceptedCount:1,rejectedCount:0};}}
 },async base=>{
  for(let attempt=1;attempt<=5;attempt+=1){
   assert.equal((await jsonPost(base,validQuote)).status,200);
  }
  const limited=await jsonPost(base,validQuote);
  const body=await limited.json();
  assert.equal(limited.status,429);
  assert.equal(body.message,'Too many submissions. Please try again later.');
  assert.equal(typeof body.requestId,'string');
  assert.equal(sends,5);
 });
});

test('quote content type and malformed or oversized JSON fail safely',async()=>{
 let sends=0;
 await withApi({
  mailConfigProvider:()=>recipientConfig,
  mailService:{send:async()=>{sends+=1;return {acceptedCount:1};}}
 },async base=>{
  const unsupported=await fetch(`${base}/api/quotes`,{method:'POST',headers:{'Content-Type':'text/plain'},body:'plain text'});
  assert.equal(unsupported.status,415);
  assert.equal((await unsupported.json()).message,'Content-Type must be application/json.');

  const malformed=await jsonPost(base,'{"name":');
  assert.equal(malformed.status,400);
  assert.equal((await malformed.json()).message,'Invalid JSON body');

  const oversized=await jsonPost(base,{payload:'x'.repeat(40000)});
  assert.equal(oversized.status,413);
  assert.equal((await oversized.json()).message,'Request body too large');

  const getResponse=await fetch(`${base}/api/quotes`);
  assert.equal(getResponse.status,404);
  assert.equal((await getResponse.json()).message,'API route not found');
  assert.equal(sends,0);
 });
});
