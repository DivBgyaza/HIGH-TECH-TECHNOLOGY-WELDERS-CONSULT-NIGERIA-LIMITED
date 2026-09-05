import {z} from 'zod';
import {email,phone,requiredText,service} from './shared.js';

export const contactSchema=z.strictObject({
 name:requiredText('Name',150),
 email,
 phone,
 service,
 subject:requiredText('Subject',200),
 message:requiredText('Message',5000)
});
