import test from 'node:test';
import assert from 'node:assert/strict';
import {API_BASE_URL,ApiRequestError,createSubmissionPayload,submitForm} from '../../src/api.js';

function jsonResponse(status,body){
 return new Response(JSON.stringify(body),{
  status,
  headers:{'Content-Type':'application/json'}
 });
}

test('frontend payload mapping includes service, maps quote date, and omits empty optionals',()=>{
 const formData=new FormData();
 formData.append('name','Ibrahim Musa');
 formData.append('company','');
 formData.append('email','ibrahim@example.com');
 formData.append('phone','0803 123 4567');
 formData.append('service','Manufacturing & Supply of Equipment and Materials');
 formData.append('location','Katsina');
 formData.append('budget','');
 formData.append('preferredStartDate','2026-10-15');
 formData.append('message','Equipment required');

 assert.deepEqual(createSubmissionPayload(formData),{
  name:'Ibrahim Musa',
  email:'ibrahim@example.com',
  phone:'0803 123 4567',
  service:'Manufacturing & Supply of Equipment and Materials',
  location:'Katsina',
  preferredStartDate:'2026-10-15',
  message:'Equipment required'
 });
});

test('frontend API helper posts JSON to the configured endpoint',async t=>{
 const originalFetch=globalThis.fetch;
 t.after(()=>{globalThis.fetch=originalFetch;});
 let request;
 globalThis.fetch=async(url,options)=>{
  request={url,options};
  return jsonResponse(200,{ok:true,message:'Your message has been received.'});
 };

 const payload={name:'Amina Yusuf',service:'Welding Services & Contracting'};
 const result=await submitForm('/api/contact',payload);
 assert.equal(request.url,`${API_BASE_URL}/api/contact`);
 assert.equal(request.options.method,'POST');
 assert.equal(request.options.headers['Content-Type'],'application/json');
 assert.deepEqual(JSON.parse(request.options.body),payload);
 assert.equal(result.ok,true);
});

for(const [status,message] of [
 [422,'Please check the submitted information.'],
 [429,'Too many submissions. Please try again later.'],
 [503,'We could not send your request right now. Please try again later.']
]){
 test(`frontend API helper maps ${status} to a safe message`,async t=>{
  const originalFetch=globalThis.fetch;
  t.after(()=>{globalThis.fetch=originalFetch;});
  globalThis.fetch=async()=>jsonResponse(status,{ok:false,message:'unsafe internal detail'});

  await assert.rejects(
   submitForm('/api/contact',{}),
   error=>error instanceof ApiRequestError&&error.status===status&&error.message===message
  );
 });
}

test('frontend API helper maps network failure to a safe retry message',async t=>{
 const originalFetch=globalThis.fetch;
 t.after(()=>{globalThis.fetch=originalFetch;});
 globalThis.fetch=async()=>{throw new Error('network internals');};

 await assert.rejects(
  submitForm('/api/quotes',{}),
  error=>error instanceof ApiRequestError&&error.status===0&&error.message==='We could not send your request right now. Please try again later.'
 );
});
