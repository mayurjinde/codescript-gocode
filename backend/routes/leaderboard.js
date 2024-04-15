import express from 'express'
import { getLeaderBoard } from '../controllers/leaderBoardController.js';

const router = express.Router();

router.get('/',getLeaderBoard)

export default router