import{ checkSimByPath } from "./SimilarityChecker.mjs"
import express, { query } from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import makeCodeFile from "./fileWriter.mjs";
import * as fs from 'fs'


const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:"*",
  
    
});

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
   //  socket.emit('hello','heeloo')

    socket.on('data',m=>{
     console.log('data',m)
     m.files.forEach(element => {
        makeCodeFile(element.code,element.fileName,m.directory)
     });

   checkSimByPath(m.directory).then(res=>{
        
        socket.emit('result',res)
        console.log('res',res)

        fs.rmSync(m.directory,{recursive:true,force:true})     
     }).catch(err=>{
        socket.emit('error','some error has occured')
     })
     

    })




    socket.on('checkScrap',data=>{
    
      // console.log('checkScrap',data)
   
      var query=data.query;
       
      var response={
         query:query,
         results:[]
      }
      
      makeCodeFile(query,'query.txt','check')

      // console.log(data.result)
   
      Array(data.data).forEach(m=>{
       console.log('m',m)
       makeCodeFile(String(m.text),'copy.txt','check')
   
      checkTextSim('check').then(res=>{
       console.log('data',res[0])
       if(res[0].right>res[0].left)
       response.results.push({
        link:m.link,
        sim:res[0].right
      })
       else
       response.results.push({
         link:m.link,
         sim:res[0].left
       })
      
           
   
       })
   
      })

      fs.rmSync(m.directory,{recursive:true,force:true}) 
   
      io.emit('sim',response)
   
   })


  });
  



io.engine.on("connection_error", (err) => {
   console.log(err.req);      // the request object
   console.log(err.code);     // the error code, for example 1
   console.log(err.message);  // the error message, for example "Session ID unknown"
   console.log(err.context);  // some additional error context
 });



server.listen(4555, () => {
    console.log('server running at http://localhost:4555');
  });


  