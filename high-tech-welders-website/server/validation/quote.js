import {z} from 'zod';
import {BUDGET_OPTIONS,email,optionalText,phone,requiredText,service} from './shared.js';

const optionalBudget=z.preprocess(
 value=>typeof value==='string'&&value.trim()===''?undefined:value,
 z.enum(BUDGET_OPTIONS,{error:'Select a valid budget range.'}).optional()
);

const optionalDate=z.preprocess(
 value=>typeof value==='string'&&value.trim()===''?undefined:value,
 z.string({error:'Enter a valid preferred start date.'})
  .regex(/^\d{4}-\d{2}-\d{2}$/,'Use YYYY-MM-DD for the preferred start date.')
  .refine(value=>{
   const [year,month,day]=value.split('-').map(Number);
   const date=new Date(Date.UTC(year,month-1,day));
   return date.getUTCFullYear()===year&&date.getUTCMonth()===month-1&&date.getUTCDate()===day;
  },'Enter a valid preferred start date.')
  .optional()
);

export const quoteSchema=z.strictObject({
 name:requiredText('Name',150),
 company:optionalText('Company',200),
 email,
 phone,
 service,
 location:requiredText('Project location',250),
 budget:optionalBudget,
 preferredStartDate:optionalDate,
 message:requiredText('Project description',5000)
});
