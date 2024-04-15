import mongoose from "mongoose";

const ScheduledTask=new mongoose.Schema({
   contestId:{type:mongoose.Schema.Types.ObjectId,ref:'contests'},
   startTime :{type:Date},
   endTime :{typeLDate},
   status:{type:String,enum :['started','pending','finished'],default:'pending'}
},{collection:'ScheduledTaskSchema'})

export default ScheduledTask