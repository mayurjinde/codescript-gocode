import gocodeproblems from '../models/Gocodeproblems.js';


const getProblemRouter = (req, res) => {
    const problemID = req.query.problemID;
//     gocodeproblems.find({},(err,problems)=>{
//    console.log("problems",problems  )
//    console.log("err",err)
    // })
    if (!problemID) {
        gocodeproblems.find({  }, (err, problems) => {
            console.log(problems.name)
            if (err) {
                res.json({
                    status: "failure"
                })
            } else {
                // console.log('problems',problems)
                res.json(problems)
            }
        })
    } else {
        gocodeproblems.findById(problemID, (err, problem) => {
            if (err) {
                res.json({
                    status: "failure"
                })
            } else {
                // console.log('problem',problem)
                res.json(problem);
            }
        })
    }
}

export default getProblemRouter