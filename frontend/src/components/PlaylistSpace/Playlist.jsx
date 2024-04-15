import React from "react";
import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Container, Row, Col } from "react-grid-system";
import Button from "@mui/material/Button";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
// import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  // 'Authorization': `Bearer ${token}`
}

export default function Playlist({ data }) {
  const {classes} = useStyles();
  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minutes: "numeric",
  };
   
  console.log(data)

  return (
    <div className={classes.root}>
      {data.map((t, i) => {
        return (
          
            <Paper key={i}
              style={{
                padding: "1rem",
                backgroundColor: "#333333",
                borderRadius: "1rem",
                margin: "2rem 2rem",
                width: "auto",
                height: "auto",
              }}
              elevation={2}
            >
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  margin: "1rem 2rem",
                  color: "#F8fbf8",
                }}
              >
                {t.name}
              </Typography>
              <Row
                style={{
                  textTransform: "capitalize",
                  margin: "1rem 0rem",
                  color: "#C9C0BB",
                }}
              >
                <PersonOutlineIcon />
                <Typography
                  variant="h7"
                  style={{
                    paddingLeft: "1rem",
                    color: "#ADD8E6",
                  }}
                >
                  Owner: RITIK KUMAR
                </Typography>
              </Row>
{/* 
              <Row
                style={{
                  textTransform: "capitalize",
                  margin: "1rem 0rem",
                  color: "#C9C0BB",
                }}
              >
                <AccessTimeIcon />

                <Typography
                  variant="h7"
                  style={{
                    paddingLeft: "1rem",

                    color: "#ADD8E6",
                  }}
                >
                  Duration: {t.Duration}
                </Typography>
              </Row> */}
              {/* <Row
                style={{
                  textTransform: "capitalize",
                  margin: "1rem 0rem",
                  color: " #C9C0BB",
                }}
              >
                <CalendarTodayIcon />
                <Typography
                  variant="h7"
                  style={{
                    paddingLeft: "1rem",

                    color: "#ADD8E6",
                  }}
                >
                  ON:{" "}
                  {new Date(t.Date).toLocaleDateString("en-US", DATE_OPTIONS)}
                </Typography>
              </Row> */}
              {/* <Button
           style={{
            display: 'flex',
            justifyContent: 'center',
            margin:'2rem 4rem'

           }}
            variant="contained" color="#3f51b5" disableElevation>
            Participate
            </Button> */}
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem ",
                }}
              >
                <Button
                  style={{
                    color: "white",
                    padding: "0rem 2rem ",
                    borderColor: "white",
                    margin: "0rem 1rem",
                  }}
                  variant="outlined"
                >
                  Share
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  href="#outlined-buttons"
                >
                  Solve
                </Button>
              </Row>
            </Paper>
          
        );
      })}
    </div>
  );
}
