import express, { json, urlencoded } from 'express';
// Use the latest stable(>12) version of nodejs
import mongoose from 'mongoose';
import cors from "cors";
const app = express();
import userRouter from './routes/user.js';
import compileRouter from './routes/compile.js';
import profileRouter from "./routes/profile.js";
import contestRouter from './routes/contest.js'
import submissionsRouter from './routes/submissions.js'
import Playlists from './routes/playlist.js';
import problemRouter from './routes/problems.js';
import pdsRouter from './routes/pds.js'
import leaderBoardRouter from './routes/leaderboard.js'
import generatePlagiarismReport from './routes/generatePlagiarismReport.js'
//import d from 'dotenv';
//d.config();

import{ createServer} from 'http'
import { Server } from 'socket.io';
import { onConnection } from './socket/index.js';

const server=createServer(app)

const io=new Server(server,{cors:'*'})


// dummy added to Profiles collection
//Profiles.create({userId: new ObjectId("615d3a535cbb99c73e8972b7"), rating: 2000});

app.use(json());
app.use(urlencoded({ extended: true }));

/* For testing */
// mongoose.connect('mongodb+srv://GoCode:GoCode@cluster0.zcitw.mongodb.net/Test-GoCode?retryWrites=true&w=majority', (err) => {
//     console.log("Connected to the database");
//     app.emit('connected')
// })

mongoose.connect("mongodb://localhost:27017/GoCode",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
}


app.use(cors())


io.on('connection',onConnection)



app.use("/user", userRouter)
app.use("/playlists", Playlists)
app.use("/", contestRouter)
app.use("/profile", profileRouter)
app.use("/api/compile", compileRouter)
app.use("/api/submissions", submissionsRouter)
app.use("/api/problems", problemRouter)
app.use("/api/pds", pdsRouter)
app.use('/leaderBoard',leaderBoardRouter)
app.use('/plagiarismReport',generatePlagiarismReport)




server.listen(process.env.PORT || 5000, () => {
    console.log("Server started...");
})



export default {app,io}