import Profile from "../models/profile.js";
import SubmissionSchema from "../models/submissionSchema.js";


const helper = async(req) => {
    try {
        const submissions = await SubmissionSchema.find({userId: req.userId,problemID:req.query.problemID}).sort({timeStamp:1})
        
        return submissions
    }
    catch {
        return []
    }
}



export const getProblemSubmissions = async (req, res) => {
    const id = req.query.problemID
    if(!id) {
        res.status(400).json({message: "No problem ID provided"})
        return
    }
    let submissions = await helper(req)
    // submissions = await filterSubmissions(submissions, id)
    res.send(submissions)
}
