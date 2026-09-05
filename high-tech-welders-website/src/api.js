const configuredBaseUrl=import.meta.env?.VITE_API_BASE_URL?.trim();

export const API_BASE_URL=(configuredBaseUrl||'http://localhost:3000').replace(/\/+$/,'');

const ERROR_MESSAGES={
 422:'Please check the submitted information.',
 429:'Too many submissions. Please try again later.',
 503:'We could not send your request right now. Please try again later.'
};

export class ApiRequestError extends Error{
 constructor(message,status=0){
  super(message);
  this.name='ApiRequestError';
  this.status=status;
 }
}

export function createSubmissionPayload(formData){
 return Object.fromEntries([...formData.entries()].filter(([,value])=>typeof value!=='string'||value.trim()!==''));
}

export async function submitForm(endpoint,payload){
 let response;

 try{
  response=await fetch(`${API_BASE_URL}${endpoint}`,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(payload)
  });
 }catch{
  throw new ApiRequestError(ERROR_MESSAGES[503]);
 }

 let body;
 try{
  body=await response.json();
 }catch{
  body=null;
 }

 if(!response.ok||body?.ok!==true){
  throw new ApiRequestError(ERROR_MESSAGES[response.status]||'Something went wrong. Please try again.',response.status);
 }

 return body;
}
