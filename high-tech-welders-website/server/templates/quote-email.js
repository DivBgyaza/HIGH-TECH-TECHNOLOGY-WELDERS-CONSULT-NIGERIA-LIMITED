import {htmlDocument,textLines} from './email-utils.js';

export function createQuoteEmail(data,{timestamp=new Date()}={}){
 const fields=[
  ['Name',data.name],
  ['Company / Organization',data.company],
  ['Email',data.email],
  ['Phone',data.phone],
  ['Service',data.service],
  ['Project Location',data.location],
  ['Estimated Budget',data.budget],
  ['Preferred Start Date',data.preferredStartDate],
  ['Project Description',data.message]
 ];
 const title='Website quote request';

 return {
  subject:'Website quote request',
  text:textLines(title,timestamp,fields),
  html:htmlDocument(title,timestamp,fields),
  replyTo:data.email
 };
}
