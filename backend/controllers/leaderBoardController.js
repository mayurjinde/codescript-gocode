import Contests from "../models/contest.js";

export async function getLeaderBoard(req,res,err){
    console.log(req.query)

const contest=await Contests.findById(req.query.contestId);
 
console.log('contest',contest)

if(!contest.leaderboardSorted){
    contest.leaderboard=contest.leaderboard.sort((a,b)=>b.score-a.score)
    contest.leaderboardSorted=true
    await contest.save()
}


// res.json(contest.leaderBoard)
res.json(contest.leaderboard)

}