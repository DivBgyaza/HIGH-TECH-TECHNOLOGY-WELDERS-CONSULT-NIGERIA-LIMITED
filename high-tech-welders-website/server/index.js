import {app} from './app.js';
import {config} from './config.js';

const server=app.listen(config.port,()=>{
 console.log(`High Tech Welders API listening on port ${config.port}`);
});

server.on('error',error=>{
 console.error(`High Tech Welders API failed to start: ${error.message}`);
 process.exitCode=1;
});

function shutdown(){
 server.close(error=>{
  if(error){
   console.error('High Tech Welders API failed to shut down cleanly.');
   process.exitCode=1;
  }
 });
}

process.on('SIGINT',shutdown);
process.on('SIGTERM',shutdown);
