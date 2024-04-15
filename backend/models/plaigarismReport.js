import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const PlagSchema = new Schema({

    code1:{type:Schema.Types.ObjectId,ref:'submissions'},
    code2:{type:Schema.Types.ObjectId,ref:'submissions'},
    similarity:{type:Number,default:0}
  
}, {collection: 'PlagSchema'});



// ContestSchema.methods.leaderboard=()=>this.leaderboard.sort((a,b)=>a.score-b.score)

const Plag = mongoose.model("PlagSchema",PlagSchema);
export default Plag;
