import axios from 'axios';
import Profile from '../models/profile.js'
import GoCodeProblems from '../models/Gocodeproblems.js'
import submissionSchema from '../models/submissionSchema.js';
import SubmissionSchema from '../models/submissionSchema.js';
import updateLeaderboard from '../utils/leaderBoardUpdate.js';

const RESOLVER = {
    "C++": "cpp17",
    "Python": "python3",
    "Java": "java",
    "C": "c"
}


export const problemCompilation = async(req, res) => {
     let { code, language, userInput, problemID, submissionType,contestId } = req.body;
     
    //  console.log('contestId',contestId)
    var score=0
    language = RESOLVER[language]
    if(submissionType !== 'test' && submissionType !== 'submit') {
        res.status(404).send('Not found');
    }
    


    const APIData = {
        "script": code,
        "language": language,
        "clientId": "308c4da45a51c54c687520f5bb4881cc",
        "clientSecret": "36bd42dadccdc22f8c09a3452a489c3e609604ea6a0816aad7da6970a783b173",
        "stdin": ""
    }

    if(submissionType === 'test') {
        APIData['stdin'] = userInput

        const resp = await axios.post('https://api.jdoodle.com/v1/execute', APIData)
        res.send(resp.data);
    } else {
        
        GoCodeProblems.findById(problemID, async(err, problemDocument) => {
            if(err) {
                res.status(404).send("Invalid request")
                return
            }
            // console.log('pro',problemDocument)
            const problem = problemDocument.toObject()
            let inputs = problem['input']
           
            let outputs = problem['output']
            score=problem['score']
            // console.log('io',inputs,outputs)
            if(problem['testInput'].length !== 0) {
                inputs = inputs.concat(problem['testInput'])
                outputs = outputs.concat(problem['testOutput'])
            }

            // console.log(inputs)
            // console.log(outputs)
            let promises = []

        
             
            for(let i = 0; i < inputs.length; i++) {
                inputs[i] = inputs[i].replace(/^\s*\n/gm, "")
                outputs[i] = outputs[i].replace(/^\s*[\r\n]/gm, "")
                APIData['stdin'] = inputs[i]
                promises.push(axios.post('https://api.jdoodle.com/v1/execute', APIData))
            }

            let accepted = true

            let submission = {
                userId:req.userId,
                problemID: problemID,
                verdict: "",
                code: code,
                language: language
            }

            

            const results = await Promise.all(promises)
            // console.log('results',results)
            for(let i = 0; i < inputs.length; i++) {
                let userOutput = results[i].data.output
                console.log(userOutput,outputs[i])
                userOutput = userOutput.replace(/^\s+|\s+$/g, '')
                outputs[i]=outputs[i].replace(/^\s+|\s+$/g, '')
                console.log(userOutput,'hello',outputs[i],userOutput==outputs[i])
                if(userOutput === outputs[i]) {
                    // console.log("correct answer for this case case", outputs[i])
                } else {
                    if(accepted) {
                        accepted = false
                        submission['verdict'] = "Wrong answer"
                        // Profile.findOneAndUpdate({userId: req.userId}, 
                        //     { $push: { problems: submission }},
                        //     (err, success) => {
                        //         if(err) {
                        //             console.log(err)
                        //         }
                        //         // console.log(success)
                        //     }
                        // )
                         
                        SubmissionSchema.create(submission).then(v=>console.log(v.id)).catch(err=>console.log(`${err} while inserting in submission Shcema`))
                         
                        res.json({"Verdict": "Wrong answer"})
                        return
                    }
                }
            }
            
            submission['verdict'] = "accepted"
            // console.log('----------------------------------------------------------------------- req \n',req)
            // Profile.findOneAndUpdate({userId: req.userId}, 
            //     { $push: { problems: submission }},
            //     (err, success) => {
            //         if(err) {
            //             console.log(err)
            //         }
            //         // console.log(success)
            //     }
            // )
            
            SubmissionSchema.create(submission).then((async(v)=>{
                            
                if(!contestId)
                 console.log(`${v._id} is inserted`)
               else
               {
                   updateLeaderboard(contestId,req.userId,problemID,score)
               }
             
           })).catch(err=>console.log(`${err} while inserting in submission Shcema`))
                         

            if(accepted) res.status(200).json({"Verdict": "Correct answer"})
        })
    }
}   