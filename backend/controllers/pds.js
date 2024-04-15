import Gocodeproblems from '../models/Gocodeproblems.js'
import gocodeproblems from '../models/Gocodeproblems.js'
import ContestProblems from '../models/contestProblems.js'
import Profile from '../models/profile.js'
import SubmissionSchema from '../models/submissionSchema.js'


export const pdsController = async (req, res) => {
    const userId = req.userId
    let tags = {}

    // const profile = await Profile.findOne({ userId: req.userId })
    //     .populate('problems.problemID')

    let problemsSolved = {}
    

    const problems = await SubmissionSchema.find({userId:req.userId})
    let problemsLength = problems.length
    console.log(problems[0].problemID)
    // For loop is synchronous
    for (let i = 0; i < problemsLength; i++) {
        let id = problems[i].problemID._id
        const problemTags=await Gocodeproblems.findOne({_id:id})
        if(problemTags)
        console.log(problemTags)
        if (problems[i].verdict === 'accepted' && !problemsSolved[id]) {
            for (let j = 0; j < problemTags.tags.length; j++) {
                if (!tags[problemTags.tags[j]]) tags[problemTags.tags[j]] = 1
                else tags[problemTags.tags[j]]++
            }
            problemsSolved[id] = true
        }
    }
    res.json(tags)
}