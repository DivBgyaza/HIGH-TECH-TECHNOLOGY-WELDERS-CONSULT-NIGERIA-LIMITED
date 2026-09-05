import {z} from 'zod';

const environmentSchema=z.object({
 NODE_ENV:z.enum(['development','test','production']).default('development'),
 PORT:z.coerce.number().int().min(1).max(65535).default(3000),
 FRONTEND_ORIGIN:z.string().url().optional()
}).superRefine((environment,context)=>{
 if(environment.NODE_ENV==='production'&&!environment.FRONTEND_ORIGIN){
  context.addIssue({
   code:'custom',
   path:['FRONTEND_ORIGIN'],
   message:'FRONTEND_ORIGIN is required in production'
  });
 }
});

const optionalEmail=z.preprocess(
 value=>typeof value==='string'&&value.trim()===''?undefined:value,
 z.string().trim().email().optional()
);

const mailEnvironmentSchema=z.object({
 SMTP_HOST:z.string().trim().min(1).max(253),
 SMTP_PORT:z.coerce.number().int().min(1).max(65535),
 SMTP_SECURE:z.enum(['true','false']).transform(value=>value==='true'),
 SMTP_USER:z.string().trim().min(1).max(320),
 SMTP_PASSWORD:z.string().min(1),
 EMAIL_FROM:z.string().trim().min(1).max(320),
 CONTACT_EMAIL_TO:z.string().trim().email(),
 CONTACT_EMAIL_CC:optionalEmail
});

const result=environmentSchema.safeParse(process.env);

if(!result.success){
 const fields=result.error.issues.map(issue=>issue.path.join('.')||'environment').join(', ');
 throw new Error(`Invalid server configuration: ${fields}`);
}

const environment=result.data;

export const config=Object.freeze({
 nodeEnv:environment.NODE_ENV,
 port:environment.PORT,
 frontendOrigin:environment.FRONTEND_ORIGIN??'http://localhost:5173',
 isProduction:environment.NODE_ENV==='production'
});

export function getMailConfig(source=process.env){
 const mailResult=mailEnvironmentSchema.safeParse(source);

 if(!mailResult.success){
  const fields=[...new Set(mailResult.error.issues.map(issue=>issue.path.join('.')||'SMTP configuration'))];
  throw new Error(`Invalid SMTP configuration: ${fields.join(', ')}`);
 }

 const mail=mailResult.data;

 return Object.freeze({
  host:mail.SMTP_HOST,
  port:mail.SMTP_PORT,
  secure:mail.SMTP_SECURE,
  user:mail.SMTP_USER,
  password:mail.SMTP_PASSWORD,
  from:mail.EMAIL_FROM,
  contactTo:mail.CONTACT_EMAIL_TO,
  contactCc:mail.CONTACT_EMAIL_CC
 });
}
