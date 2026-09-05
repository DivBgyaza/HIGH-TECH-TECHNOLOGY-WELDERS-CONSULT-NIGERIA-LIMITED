import test from 'node:test';
import assert from 'node:assert/strict';
import {getMailConfig} from '../config.js';
import {createEmailService,EmailDeliveryError} from '../services/email.js';
import {createContactEmail} from '../templates/contact-email.js';
import {createQuoteEmail} from '../templates/quote-email.js';
import {SERVICE_TITLES} from '../validation/shared.js';

const mailConfig={
 host:'smtp.example.com',
 port:587,
 secure:false,
 user:'smtp-user',
 password:'not-a-real-secret',
 from:'High Tech Welders <sender@example.com>',
 contactTo:'owner@example.com',
 contactCc:undefined
};

test('central mail configuration parses SMTP values without exposing them at startup',()=>{
 const parsed=getMailConfig({
  SMTP_HOST:'smtp.example.com',
  SMTP_PORT:'587',
  SMTP_SECURE:'false',
  SMTP_USER:'smtp-user',
  SMTP_PASSWORD:'not-a-real-secret',
  EMAIL_FROM:'High Tech Welders <sender@example.com>',
  CONTACT_EMAIL_TO:'owner@example.com',
  CONTACT_EMAIL_CC:''
 });
 assert.deepEqual(parsed,mailConfig);
 assert.throws(()=>getMailConfig({}),/Invalid SMTP configuration/);
});

test('contact template escapes HTML and keeps readable text and Reply-To',()=>{
 const email=createContactEmail({
  name:'Amina <Admin> & "Team"',
  email:'amina@example.com',
  phone:'+234 803 000 0000',
  service:SERVICE_TITLES[0],
  subject:'Safety > speed',
  message:'Line one\n<script>alert("x")</script>'
 },{timestamp:new Date('2026-09-05T12:00:00.000Z')});

 assert.match(email.html,/Amina &lt;Admin&gt; &amp; &quot;Team&quot;/);
 assert.doesNotMatch(email.html,/<script>/);
 assert.match(email.html,/Line one<br>&lt;script&gt;/);
 assert.match(email.text,/Amina <Admin> & "Team"/);
 assert.match(email.text,/Submitted: 2026-09-05T12:00:00.000Z/);
 assert.equal(email.replyTo,'amina@example.com');
 assert.equal('to' in email,false);
 assert.equal('cc' in email,false);
});

test('quote template labels optional project data and contains no recipient or secret',()=>{
 const email=createQuoteEmail({
  name:'Ibrahim Musa',
  company:'Musa & Sons',
  email:'ibrahim@example.com',
  phone:'0803 123 4567',
  service:SERVICE_TITLES[1],
  location:'Katsina',
  budget:'Under ₦500,000',
  preferredStartDate:'2026-10-15',
  message:'Equipment required'
 },{timestamp:new Date('2026-09-05T12:00:00.000Z')});

 assert.match(email.html,/Musa &amp; Sons/);
 assert.match(email.text,/Estimated Budget: Under ₦500,000/);
 assert.match(email.text,/Preferred Start Date: 2026-10-15/);
 assert.equal(email.replyTo,'ibrahim@example.com');
 assert.doesNotMatch(JSON.stringify(email),/not-a-real-secret|owner@example\.com/);
});

test('email service uses central SMTP settings and returns limited metadata',async()=>{
 let transportOptions;
 let sentMessage;
 const service=createEmailService({
  mailConfigProvider:()=>mailConfig,
  transportFactory:options=>{
   transportOptions=options;
   return {sendMail:async message=>{
    sentMessage=message;
    return {messageId:'message-123',accepted:['owner@example.com'],rejected:[]};
   }};
  }
 });

 const result=await service.send({
  to:mailConfig.contactTo,
  subject:'Website contact message',
  text:'Text content',
  html:'<p>Text content</p>',
  replyTo:'visitor@example.com'
 });

 assert.deepEqual(transportOptions,{
  host:'smtp.example.com',
  port:587,
  secure:false,
  auth:{user:'smtp-user',pass:'not-a-real-secret'}
 });
 assert.equal(sentMessage.from,mailConfig.from);
 assert.equal(sentMessage.replyTo,'visitor@example.com');
 assert.deepEqual(result,{messageId:'message-123',acceptedCount:1,rejectedCount:0});
 assert.doesNotMatch(JSON.stringify({sentMessage,result}),/not-a-real-secret/);
});

test('email service converts provider failures to a safe error',async()=>{
 const service=createEmailService({
  mailConfigProvider:()=>mailConfig,
  transportFactory:()=>({sendMail:async()=>{throw new Error('provider host and account details');}})
 });

 await assert.rejects(
  service.send({to:'owner@example.com',subject:'Test',text:'Test',html:'<p>Test</p>',replyTo:'visitor@example.com'}),
  error=>error instanceof EmailDeliveryError&&error.message==='Email delivery failed.'&&error.code==='EMAIL_DELIVERY_FAILED'
 );
});
