import {z} from 'zod';

export const SERVICE_TITLES=[
 'Welding Services & Contracting',
 'Manufacturing & Supply of Equipment and Materials',
 'General Trading & Merchandising',
 'Import & Export of Goods',
 'Farming & Livestock Breeding',
 'Solar Energy Solutions & Automation Services',
 'Petrol Filling Stations & Service Stations',
 'Food Processing & Manufacturing',
 'Soft Drinks & Pure Water Production',
 'CCTV Installation & Security Services',
 'General Printing',
 'Fashion & Design Industry Services',
 'Estate Management & Property Development',
 'Transportation & Tourism'
];

export const BUDGET_OPTIONS=[
 'Under ₦500,000',
 '₦500,000 – ₦2,000,000',
 '₦2,000,000 – ₦10,000,000',
 'Above ₦10,000,000'
];

export function requiredText(label,maxLength){
 return z.string({error:`${label} is required.`})
  .trim()
  .min(1,`${label} is required.`)
  .max(maxLength,`${label} is too long.`);
}

export function optionalText(label,maxLength){
 return z.preprocess(
  value=>typeof value==='string'&&value.trim()===''?undefined:value,
  z.string({error:`${label} must be text.`})
   .trim()
   .max(maxLength,`${label} is too long.`)
   .optional()
 );
}

export const email=requiredText('Email',254)
 .pipe(z.string().email('Enter a valid email address.'))
 .transform(value=>value.toLowerCase());

export const phone=requiredText('Phone number',40).refine(value=>{
 const validCharacters=/^[0-9+().\-\s]+$/.test(value);
 const digitCount=(value.match(/\d/g)??[]).length;
 return validCharacters&&digitCount>=7&&digitCount<=20;
},'Enter a valid phone number.');

export const service=z.enum(SERVICE_TITLES,{error:'Select a valid service.'});

export function formatValidationError(error){
 const fields={};

 for(const issue of error.issues??[]){
  const field=String(issue.path[0]??'form');
  if(!fields[field]){
   fields[field]=issue.message;
  }
 }

 return {ok:false,message:'Please check the submitted information.',fields};
}
