import Contests from "./models/contest.js";
import mongoose from "mongoose";
import SubmissionSchema from "./models/submissionSchema.js";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Plag from "./models/plaigarismReport.js";

const socket=io('http://localhost:4555')

mongoose.connect("mongodb://localhost:27017/GoCode",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const LANGUAGE_MODE = {
  "cpp17": ".cpp",
  "python3": ".py",
  "java": ".java",
  "c": ".c",
};
const lag=['cpp17','python3','java','c']


function makeData(submissions,lang){
  const data={
    directory:uuidv4()
    ,files:[]
  }

  submissions.forEach(m=>{
    // console.log(m)
    data.files.push({
        fileName:m._id.toString()+LANGUAGE_MODE[lang],
        code:m.code
    })
    
  })
  return data

}

const contest=await Contests.findById("65fdd952da67e6123a56f47d")

lag.forEach(lang=>

{
  // console.log(lang) 

  contest.problems.forEach(async m=>{
    // console.log(m)
    // const lang="cpp17"
   SubmissionSchema.find({problemID:m,verdict:'accepted',language:lang}).then(sub=>{
    // console.log(sub)
    if(sub.length>=2)
    socket.emit('data',makeData(sub,lang))

   }) 

 
}




)
  

   
})




const getBaseName=(name)=>name.split('.')[0]


socket.on('result',(res)=>{
    // console.log(res)
    Array.from(res).forEach(async report=>{
  
     var sim=report.similarity
     var file1=getBaseName(report.leftFileName)
     var file2=getBaseName(report.rightFileName)
     //  console.log(sim,file1,file2)
      var code1=await SubmissionSchema.findById(file1)
      var code2=await SubmissionSchema.findById(file2)
     
 
      console.log(code1.userId,code2.userId)
      
     if(sim>0.8){
     
   
   
   
  if(code1.userId!==code2.userId){   
    console.log('yess',report.leftFileName)
     Plag.create({

        similarity:sim,
        code1:code1,
        code2:code2
     }).then(async v=>{
       console.log(v)
        if(code1.plag.sim<sim){
      await SubmissionSchema.findOneAndUpdate({_id:file1},{plag:{plagReport:v,sim:sim}})
         
        }

    if(code2.plag.sim<sim){
       
      await SubmissionSchema.findOneAndUpdate({_id:file2},{plag:{plagReport:v,sim:sim}})
    }


     })
     


    }


  }

    }
    
    
    )
    

})