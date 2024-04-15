import { Dolos } from "@dodona/dolos-lib";
import * as fs from 'fs'
import { parse } from "path";


class SimInfo{
     leftFileName;
      rightFile;
      similarity;
      problemId;
      contestId;
      left;
      right;
      leftCode;
      rightCode;
}




function findPath(directoryPath){
    
    const f=fs.readdirSync(directoryPath)

    var files=[]

    f.forEach((e,i)=>f[i]=directoryPath+'/'+e)
    return f;
    
}


async function checkSimByPath(directoryPath){
  if(fs.existsSync(directoryPath))
 {  
    var files=findPath(directoryPath)
    try {
      
   var data=[]
   const dolos = new Dolos();
     console.log('files',files)
    const report = await dolos.analyzePaths(files);
    

   report.allPairs().forEach(pair=>{
    var d=new SimInfo()
    d.leftFileName=parse(pair.leftFile.path).base
    d.rightFileName=parse(pair.rightFile.path).base
    d.similarity=pair.similarity
    d.left=pair.leftCovered/pair.leftTotal
    d.right=pair.rightCovered/pair.rightTotal
    d.leftCode=pair.leftFile.lines.join('\n')
d.rightCode=pair.rightFile.lines.join('\n')
     
    data.push(d)

   })
    return data


    
        
    } catch (error) {
         console.log('error',error)
    }

 }
else
console.log('no',directoryPath) 

}


async function checkSimByPath2(directoryPath){
     if(fs.existsSync(directoryPath))
    {  
       var files=findPath(directoryPath)
       try {
         
      var data=[]
      const dolos = new Dolos();
        console.log('files',files)
       const report = await dolos.analyzePaths(files);
       
   
      report.allPairs().forEach(pair=>{

          console.log(pair.leftFile.lines)
       var d=new SimInfo()
       d.leftFileName=parse(pair.leftFile.path).base
       d.rightFileName=parse(pair.rightFile.path).base
       d.similarity=pair.similarity
       d.left=pair.leftCovered/pair.leftTotal
       d.right=pair.rightCovered/pair.rightTotal
       d.leftCode=pair.leftFile.lines.join('\n')
        d.rightCode=pair.rightFile.lines.join('\n')
     

       data.push(d)
   
      })
       return data
   
   
       
           
       } catch (error) {
            console.log('error',error)
       }
   
    }
   else
   console.log('no',directoryPath) 
   
   }

   checkSimByPath2('./files').then(res=>console.log(res))

 


export {checkSimByPath};