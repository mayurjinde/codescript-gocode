import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { domain } from "../../constants/config"
import { Ranking } from "./Ranking"
import { Typography } from "@mui/material"



export const LeaderBoard=props=>{
    const contestId=useParams().contestId
    const [rank,setRank]=useState([])
    const [timer,setTimer]=useState(30)
 
    // console.log('i am working',domain)

    const interval=30;



 
useEffect(()=>{
    // console.log(`${domain}+/leaderBoard`)

    axios.get(`${domain}/leaderBoard`,{params:{contestId:contestId}}).
   
    then(res=> 
     {console.log(res.data)
     setRank(res.data)}).catch(err=>console.log(err.message))
     setInterval(()=>{
        setTimer(pre=>pre-1)
    
    },1000)

  setInterval(() => {
    axios.get(`${domain}/leaderBoard`,{params:{contestId:contestId}}).
   
    then(res=> 
     {console.log(res.data)
     setRank(res.data)
     setTimer(interval)
    }).catch(err=>console.log(err.message))
    
  }, interval*1000);

},[])


return <>
    <div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div>
      <Typography color='white' style={{
        margin:'2px',
        fontWeight:'bolder',
        fontStyle:'italic'
      }}>
      leader Board will be updated in {timer} seconds.
      </Typography>
   
    </div>
    {rank.length !== 0 ? <Ranking ranking={rank}/>

      : <div>No participants</div>

    }

    

</div>
</>

}