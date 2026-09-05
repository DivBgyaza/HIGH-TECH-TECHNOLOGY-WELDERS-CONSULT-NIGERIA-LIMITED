export function notFound(req,res){
 res.status(404).json({
  ok:false,
  message:'API route not found',
  requestId:req.requestId
 });
}

export function errorHandler(error,req,res,next){
 if(res.headersSent){
  next(error);
  return;
 }

 if(process.env.NODE_ENV!=='production'){
  console.error(`[${req.requestId}]`,error);
 }

 const bodyTooLarge=error?.type==='entity.too.large';
 const invalidJson=error instanceof SyntaxError&&error?.type==='entity.parse.failed';
 const status=bodyTooLarge?413:invalidJson?400:Number.isInteger(error?.status)?error.status:500;
 const safeMessage=bodyTooLarge
  ? 'Request body too large'
  : invalidJson
   ? 'Invalid JSON body'
   : status===403
    ? 'Origin not allowed'
    : 'Internal server error';

 res.status(status).json({
  ok:false,
  message:safeMessage,
  requestId:req.requestId
 });
}
