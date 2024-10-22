import { useEffect, useState } from "react";
import { Col } from "react-grid-system";
import ReactLoading from "react-loading";
import ProblemBox from "./ProblemBox";
import {  alpha } from "@mui/material/styles";

import {styled } from '@mui/material'
import InputBase from "@mui/material/InputBase";
import SearchIcon from '@mui/icons-material/Search';
import { domain } from '../../constants/config';
import CodeEditor from "../CodingSpace/CodeEditor";
import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
  },

  content: {
    flexGrow: 1,
    paddingTop: "100px",
    padding: theme.spacing(3),
    backgroundColor: "#212121",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    height: "2.5rem",
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.8),
    },
    marginRight: theme.spacing(30),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(30),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  grow: {
    flexGrow: 1,
  },
}));

const ProblemSpace = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {classes,cx} = useStyles();
  const hasCache = (expireTime, cachedProblems) => {
    if (
      cachedProblems === null ||
      expireTime === null ||
      +new Date() > expireTime
    )
      return false;
    return true;
  };
  // Problems refresh every 5 minutes
  const MINUTES_TO_ADD = 5;

  useEffect(() => {
    const cachedProblems = localStorage.getItem("problems");
    console.log('cahce',cachedProblems)
    console.log(+new Date())
    const expireTime = localStorage.getItem("problemsExpirationTimestamp");
    console.log('condition',hasCache(expireTime, cachedProblems))
    if (!hasCache(expireTime, cachedProblems)) {
      fetch(`${domain}/api/problems`)
        .then((data) => data.json())
        .then((data) => {
          let tags = [];
          console.log('data',data);
          data.forEach((problem) => {
            problem.tags.forEach((tag) => {
              tags.push(tag);
              console.log(tag);
            });
          });
          console.log(tags);
          const uniqueTags = new Set(tags);
          console.log(uniqueTags);
          const finalData = {};
          uniqueTags.forEach((t) => {
            finalData[t] = data.filter((d) => {
              return d.tags.indexOf(t) !== -1;
            });
          });
          setProblems(finalData);
          localStorage.setItem("problems", JSON.stringify(finalData));
          let currentDate = new Date();
          let expireTimeStamp = +new Date(
            currentDate.getTime() + MINUTES_TO_ADD * 60000
          );
          localStorage.setItem("problemsExpirationTimestamp", expireTimeStamp);
          setLoading(false);
        });
    } else {
      setProblems(JSON.parse(cachedProblems));
      setLoading(false);
    }  
  }, []);

  const loadingOptions = {
    type: "spin",
    color: "#347deb",
  };

  console.log('hello',loading)

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <ReactLoading
            type={loadingOptions.type}
            color={loadingOptions.color}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <Col>
          <div className={cx(classes.search)}>
            <div className={cx(classes.searchIcon)}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: cx(classes.inputRoot),
                input: cx(classes.inputInput),
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {Object.entries(problems).map((problem, i) => (
            <ProblemBox problemset={problem} key={i} />
          ))}
         

        </Col>
      )}
    </>
  );
};

export default ProblemSpace;
