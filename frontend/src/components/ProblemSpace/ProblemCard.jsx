import { Chip, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const problemURL = "/problem/";

const ProblemCard = ({ problem }) => {
  return (
    <Paper
      style={{
        margin: "2rem",
        padding: "0.5rem 5rem",
        borderRadius: "2rem",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Link to={problemURL + problem._id}>
            <Typography variant="h5"> {problem.name}</Typography>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography component="span">Other Tags:</Typography>
          {problem.tags.map((p, i) => {
            return (
              <Chip
                size="small"
                label={p}
                key={i}
                style={{
                  padding: "10px",
                  margin: "5px",
                }}
              />
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProblemCard;

// {problem.name} <Link to={problemURL + problem._id}>problem</Link>
