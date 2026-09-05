import {htmlDocument,textLines} from './email-utils.js';

export function createContactEmail(data,{timestamp=new Date()}={}){
 const fields=[
  ['Name',data.name],
  ['Email',data.email],
  ['Phone',data.phone],
  ['Service',data.service],
  ['Subject',data.subject],
  ['Message',data.message]
 ];
 const title='Website contact submission';

 return {
  subject:'Website contact message',
  text:textLines(title,timestamp,fields),
  html:htmlDocument(title,timestamp,fields),
  replyTo:data.email
 };
}
