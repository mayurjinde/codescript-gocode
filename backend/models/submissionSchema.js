import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        problemID: {type: Schema.Types.ObjectId, ref: 'GoCodeProblems'},
        verdict: {type: String},
        timeStamp: {type: Date, default: Date.now},
        code: {type: String},
        language: {type: String},
        contestId:{type:Schema.Types.ObjectId,ref:'Contests'},
        plag:{
                plagReport:{type:Schema.Types.ObjectId,ref:'PlagSchema'},
                sim:{type:Number,default:0}
        }
}, {collection: 'submissions'});

const SubmissionSchema = mongoose.model("submissions", submissionSchema);

export default SubmissionSchema;