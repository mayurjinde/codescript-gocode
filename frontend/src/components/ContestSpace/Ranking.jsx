import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  table: {
    minWidth: 650,
  },
  tableHead: {
    fontWeight: 'bolder',
    backgroundColor: '#219ebc', // Custom background color for table head
  },
});

export const Ranking = ({ ranking }) => {
  const { classes } = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="leaderboard table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell><Typography fontWeight={'bold'}>Rank</Typography></TableCell>
            <TableCell><Typography fontWeight={'bold'}>User Name</Typography></TableCell>
            <TableCell><Typography fontWeight={'bold'}>Score</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.name}</TableCell> {/* Assuming userName is a field in the leaderboard entry */}
              <TableCell>{entry.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
