import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ContestSchema = new Schema({
    name: {type: String},
    Description: {type: String},
    Host: {type: String},
    Date: {type: Date},
    Duration: {type: String},
    isPublic: {type: Boolean},
    hostId: {type: Schema.Types.ObjectId, ref: 'User'},
    problems: {type: [Schema.Types.ObjectId], ref: 'GoCodeProblems'},
    leaderboard: [{
        userID: {type: Schema.Types.ObjectId, ref: 'User'},
        name:{type:String},
        score: {type: Number},
        solvedProblems: [{ type: Schema.Types.ObjectId, ref: 'GoCodeProblems' }] // Array to store solved problems
    }],
    leaderboardSorted:{type:Boolean,default:false}
}, {collection: 'Contests'});



// ContestSchema.methods.leaderboard=()=>this.leaderboard.sort((a,b)=>a.score-b.score)

const Contests = mongoose.model("Contests",ContestSchema);
export default Contests;
