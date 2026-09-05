import cors from 'cors';
import express from 'express';
import {rateLimit} from 'express-rate-limit';
import helmet from 'helmet';
import {config} from './config.js';
import {errorHandler,notFound} from './middleware/error-handler.js';
import {requestId} from './middleware/request-id.js';
import {createContactRouter} from './routes/contact.js';
import {createQuoteRouter} from './routes/quotes.js';

export function createApp({contactRouteOptions,quoteRouteOptions}={}){
 const app=express();

 app.disable('x-powered-by');
 app.use(helmet());
 app.use(requestId);
 app.use(cors({
  origin(origin,callback){
   if(!origin||origin===config.frontendOrigin){
    callback(null,true);
    return;
   }

   const error=new Error('CORS origin rejected');
   error.status=403;
   callback(error);
  },
  methods:['GET','POST','OPTIONS'],
  allowedHeaders:['Content-Type','X-Request-Id'],
  exposedHeaders:['X-Request-Id'],
  maxAge:600
 }));
 app.use(express.json({limit:'32kb',strict:true}));

 app.use('/api',rateLimit({
  windowMs:15*60*1000,
  limit:100,
  standardHeaders:'draft-7',
  legacyHeaders:false,
  handler(req,res){
   res.status(429).json({
    ok:false,
    message:'Too many requests. Please try again later.',
    requestId:req.requestId
   });
  }
 }));

 app.get('/api/health',(req,res)=>{
  res.status(200).json({ok:true,service:'high-tech-welders-api'});
 });
 app.use('/api/contact',createContactRouter(contactRouteOptions));
 app.use('/api/quotes',createQuoteRouter(quoteRouteOptions));

 app.use(notFound);
 app.use(errorHandler);

 return app;
}

export const app=createApp();
