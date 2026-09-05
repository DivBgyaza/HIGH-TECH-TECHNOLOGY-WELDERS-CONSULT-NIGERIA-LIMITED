import {Router} from 'express';
import {rateLimit} from 'express-rate-limit';
import {getMailConfig} from '../config.js';
import {emailService} from '../services/email.js';
import {createQuoteEmail} from '../templates/quote-email.js';
import {quoteSchema} from '../validation/quote.js';
import {formatValidationError} from '../validation/shared.js';

function createQuoteLimiter(){
 return rateLimit({
  windowMs:15*60*1000,
  limit:5,
  standardHeaders:'draft-7',
  legacyHeaders:false,
  handler(req,res){
   res.status(429).json({
    ok:false,
    message:'Too many submissions. Please try again later.',
    requestId:req.requestId
   });
  }
 });
}

export function createQuoteRouter({
 mailService=emailService,
 mailConfigProvider=getMailConfig
}={}){
 const router=Router();

 router.post('/',createQuoteLimiter(),async(req,res)=>{
  if(!req.is('application/json')){
   res.status(415).json({
    ok:false,
    message:'Content-Type must be application/json.',
    requestId:req.requestId
   });
   return;
  }

  const validation=quoteSchema.safeParse(req.body);

  if(!validation.success){
   res.status(422).json({
    ...formatValidationError(validation.error),
    requestId:req.requestId
   });
   return;
  }

  try{
   const mailConfig=mailConfigProvider();
   const message=createQuoteEmail(validation.data);
   const delivery=await mailService.send({
    to:mailConfig.contactTo,
    cc:mailConfig.contactCc,
    ...message
   });

   if(delivery.acceptedCount<1){
    throw new Error('SMTP provider did not accept a recipient');
   }

   res.status(200).json({
    ok:true,
    message:'Your quote request has been received.',
    requestId:req.requestId
   });
  }catch(error){
   const errorCode=typeof error?.code==='string'?error.code:'QUOTE_DELIVERY_FAILED';
   if(process.env.NODE_ENV!=='production'){
    console.error(`[${req.requestId}] Quote delivery failed (${errorCode}).`);
   }

   res.status(503).json({
    ok:false,
    message:'We could not send your quote request right now. Please try again later.',
    requestId:req.requestId
   });
  }
 });

 return router;
}
