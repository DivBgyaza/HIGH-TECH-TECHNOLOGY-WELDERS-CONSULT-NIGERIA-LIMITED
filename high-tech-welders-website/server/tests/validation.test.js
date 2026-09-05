import test from 'node:test';
import assert from 'node:assert/strict';
import {contactSchema} from '../validation/contact.js';
import {quoteSchema} from '../validation/quote.js';
import {formatValidationError,SERVICE_TITLES} from '../validation/shared.js';

const validContact={
 name:'Amina Yusuf',
 email:'amina@example.com',
 phone:'+234 803 096 5094',
 service:SERVICE_TITLES[0],
 subject:'Welding enquiry',
 message:'Please contact me about a fabrication project.'
};

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

test('contact schema accepts and trims a valid payload',()=>{
 const result=contactSchema.safeParse({...validContact,name:'  Amina Yusuf  ',email:' AMINA@EXAMPLE.COM '});
 assert.equal(result.success,true);
 assert.equal(result.data.name,'Amina Yusuf');
 assert.equal(result.data.email,'amina@example.com');
});

test('contact schema rejects invalid or missing fields',()=>{
 assert.equal(contactSchema.safeParse({...validContact,email:'invalid'}).success,false);
 const {subject,...withoutSubject}=validContact;
 assert.equal(contactSchema.safeParse(withoutSubject).success,false);
 assert.equal(contactSchema.safeParse({...validContact,service:'Unknown service'}).success,false);
 assert.equal(contactSchema.safeParse({...validContact,message:'x'.repeat(5001)}).success,false);
 assert.equal(contactSchema.safeParse({...validContact,unexpected:'value'}).success,false);
});

test('quote schema accepts full and minimal valid payloads',()=>{
 assert.equal(quoteSchema.safeParse(validQuote).success,true);
 const {company,budget,preferredStartDate,...minimal}=validQuote;
 assert.equal(quoteSchema.safeParse(minimal).success,true);

 const normalized=quoteSchema.parse({...validQuote,company:'  ',budget:'',preferredStartDate:''});
 assert.equal(normalized.company,undefined);
 assert.equal(normalized.budget,undefined);
 assert.equal(normalized.preferredStartDate,undefined);
});

test('quote schema rejects invalid fields and calendar dates',()=>{
 assert.equal(quoteSchema.safeParse({...validQuote,email:'invalid'}).success,false);
 assert.equal(quoteSchema.safeParse({...validQuote,service:'Unknown service'}).success,false);
 assert.equal(quoteSchema.safeParse({...validQuote,budget:'Any amount'}).success,false);
 assert.equal(quoteSchema.safeParse({...validQuote,preferredStartDate:'15/10/2026'}).success,false);
 assert.equal(quoteSchema.safeParse({...validQuote,preferredStartDate:'2026-02-30'}).success,false);
 assert.equal(quoteSchema.safeParse({...validQuote,message:'x'.repeat(5001)}).success,false);
 assert.equal(quoteSchema.safeParse({...validQuote,unexpected:'value'}).success,false);
});

test('validation errors format into safe API-ready field messages',()=>{
 const result=contactSchema.safeParse({...validContact,email:'invalid'});
 const formatted=formatValidationError(result.error);
 assert.deepEqual(formatted,{
  ok:false,
  message:'Please check the submitted information.',
  fields:{email:'Enter a valid email address.'}
 });
});
