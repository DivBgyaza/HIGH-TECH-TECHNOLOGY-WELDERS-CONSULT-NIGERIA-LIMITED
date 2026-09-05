import nodemailer from 'nodemailer';
import {getMailConfig} from '../config.js';

export class EmailDeliveryError extends Error{
 constructor(){
  super('Email delivery failed.');
  this.name='EmailDeliveryError';
  this.code='EMAIL_DELIVERY_FAILED';
 }
}

export function createEmailService({
 mailConfigProvider=getMailConfig,
 transportFactory=options=>nodemailer.createTransport(options)
}={}){
 let transport;
 let mailConfig;

 function initialize(){
  if(!transport){
   mailConfig=mailConfigProvider();
   transport=transportFactory({
    host:mailConfig.host,
    port:mailConfig.port,
    secure:mailConfig.secure,
    auth:{user:mailConfig.user,pass:mailConfig.password}
   });
  }
 }

 return Object.freeze({
  async send({to,cc,subject,text,html,replyTo}){
   initialize();

   try{
    const result=await transport.sendMail({
     from:mailConfig.from,
     to,
     ...(cc?{cc}:{}),
     subject,
     text,
     html,
     replyTo
    });

    return {
     messageId:result.messageId,
     acceptedCount:Array.isArray(result.accepted)?result.accepted.length:0,
     rejectedCount:Array.isArray(result.rejected)?result.rejected.length:0
    };
   }catch{
    throw new EmailDeliveryError();
   }
  }
 });
}

export const emailService=createEmailService();
