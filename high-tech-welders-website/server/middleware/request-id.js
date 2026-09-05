import {randomUUID} from 'node:crypto';

const SAFE_REQUEST_ID=/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;

export function requestId(req,res,next){
 const supplied=req.get('x-request-id');
 const id=typeof supplied==='string'&&SAFE_REQUEST_ID.test(supplied)
  ? supplied
  : randomUUID();

 req.requestId=id;
 res.setHeader('X-Request-Id',id);
 next();
}
