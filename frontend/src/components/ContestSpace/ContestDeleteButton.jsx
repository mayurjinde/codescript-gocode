import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import {  useNavigate } from "react-router";
import { domain } from "../../constants/config";

export default function ContestDeleteButton({ contest }) {
  const history = useNavigate();
  const deleteContest = (contestId) => {
      const storage = JSON.parse(localStorage.getItem("profile"));
      // console.log(storage)
      if (storage === null) {
        history("/auth");
        return;
      }
      let token = storage.token;
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token}`,
      };
        // console.log(contestId);
        console.log(`${domain}/api/contests/${contestId}`);
        axios.delete(`${domain}/api/contests/${contestId}`, {headers: headers})
        .then((res) => {
          if(res.status === 200) {
            alert("Contest Deleted Successfully");
            history('/problems');
            console.log(this);
          }
          else console.log(res);
        })
    }
    
    if (
      JSON.parse(localStorage.getItem("profile"))["result"]["_id"] ===
      contest.hostId
    ) {
        return(
            <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#ff4d4d",
                    padding: "0rem 2rem",
                    margin: "0rem 1rem"
                  }}
                  onClick={() => deleteContest(contest._id)}
                >
                  Delete
                </Button>
        );
    }
    else return(null);
}
