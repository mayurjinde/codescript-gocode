import Contests from "../models/contest.js";
import user from "../models/user.js";

async function updateLeaderboard(contestId, userId, problemId, newScore) {
    try {
        // Retrieve the contest document
        const contest = await Contests.findById(contestId);
        
        console.log(contest.leaderboard)
        // Check if the user has already solved the problem
        const userEntryIndex = contest.leaderboard.findIndex(entry => entry.userID.toString() === userId);

        if (userEntryIndex !== -1 && contest.leaderboard[userEntryIndex].solvedProblems.includes(problemId)) {
            // User has already solved the problem, no need to update the leaderboard
            console.log('User has already solved this problem.');
            return;
        }

        // Find or update the user's entry in the leaderboard
        if (userEntryIndex !== -1) {
            // User already exists in the leaderboard, update their score and add the solved problem
            contest.leaderboard[userEntryIndex].score += newScore;
            contest.leaderboard[userEntryIndex].solvedProblems.push(problemId);
            contest.leaderboardSorted=false
        } else {
            // User doesn't exist in the leaderboard, add a new entry
            const u=await user.findById(userId);
            console.log('user',u,userId)
            console.log('leaderBoard',contest.leaderboard)
            contest.leaderboard.push({userID: u, score: newScore, solvedProblems: [problemId],name:u.name });
            contest.leaderboardSorted=false
        }
      


        // Sort the leaderboard based on score in descending order
        // contest.leaderboard.sort((a, b) => b.score - a.score);

        // Save the updated contest document
        await contest.save();

        console.log('Leaderboard updated successfully.');
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

export default updateLeaderboard