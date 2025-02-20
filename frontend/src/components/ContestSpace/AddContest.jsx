import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Row } from "react-grid-system";
import Select from "react-select";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import { DATE_OPTIONS } from "../../constants/dateOptions";
import { tags } from "../../constants/tags";
import { domain } from "../../constants/config";
import { makeStyles } from "tss-react/mui";
import { useParams } from "react-router";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  h1: {
    marginTop: "10px",
    color: "black",
    fontSize: "25px",
    paddingBottom: "10px",
    borderBottom: "1px solid rgb(79, 98, 148)",
  },

  form: {
    maxWidth: "800px",
    margin: "0 auto",
  },

  p: {
    color: "#bf1650",
    textAlign: "center",
  },

  input: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid black",
    padding: "10px 15px",
    marginBottom: "10px",
    fontSize: "14px",
  },

  label: {
    lineHeight: "2",
    textAlign: "left",
    display: "block",
    marginBottom: "13px",
    marginTop: "20px",
    color: "black",
    fontSize: "14px",
    fontWeight: "200",
  },

  submitButton: {
    background: "#ec5990",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    marginTop: "40px",
    padding: "20px",
    fontSize: "16px",
    fontWeight: "100",
    letterSpacing: "10px",
    display: "block",
    appearance: "none",
    borderRadius: "4px",
    width: "100%",
  },

  container: {
    backgroundColor: "#2f3956",
    marginTop: "100px",
    paddingBottom: "30px",
    paddingTop: "20px",
    borderRadius: "25px",
  },

  dropdown: {
    width: "50%",
  },
}));
const AddContest = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [contestsOverview, setcontestsOverview] = useState();
  const [loading, setLoading] = useState(true);
  const [contestProblems, setcontestProblems] = useState([]);
  // const contestProblems = [];
  const loadingOptions = {
    type: "spin",
    color: "#347deb",
  };

  const id=useParams().id

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("profile"));

    let token = storage.token;
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
    axios.get(`${domain}/api/contests/` + id, {headers: headers})
      .then((data) => {
        console.log(data.data);
        fillProblems(data.data);
        setcontestProblems([]);
        var pCount = 0;
        data.data.problems.forEach((problemID) => {
          let problemURL = `${domain}/api/problems?problemID=${problemID}`;
          axios.get(problemURL, {headers: headers})
            .then((problem) => {
              console.log(problem.data)
              contestProblems.push(problem.data);
              pCount++;
              if (pCount === data.data.problems.length) {
                setcontestsOverview(data.data);
                setLoading(false);
              }
            });
        });
        if (pCount === 0) {
          setcontestsOverview(data.data);
          setLoading(false);
        }
      });
  }, []);
  function fillProblems(data) {
    setcontestProblems([]);
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
    // console.log(data);
    data["problems"].forEach((problemID) => {
      let problemURL = `http://localhost:5000/api/problems?problemID=${problemID}`;
      fetch(problemURL)
        .then((problem) => problem.json())
        .then((problem) => {
          contestProblems.push(problem);
        });
    });
  }
  const [loadingProblemSubmit, setloadingProblemSubmit] = useState(false);
  const onSubmit = (data) => {
    data["tags"] = selectedOptions;
    data["hidden"] = true;
    data["contestId"] = id;
    console.log(data);
    const storage = JSON.parse(localStorage.getItem("profile"));
    let token = storage.token;
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    setloadingProblemSubmit(true);
    axios
      .post(`${domain}/api/addproblem`, data, {headers: headers})
      .then((res) => {
        // console.log(res);
        axios
          .get(`${domain}/api/contests/` + id, {headers: headers})
          .then((res) => {
            console.log("##################");

            let cDetails = Object.entries(res)[0][1];

            let tcproblems = [];

            var pCount = 0;
            setcontestProblems([]);
            cDetails["problems"].forEach((problemID) => {
              let problemURL = `${domain}/api/problems?problemID=${problemID}`;
              fetch(problemURL, {
                method: "GET",
                headers: headers,
              })
                .then((problem) => problem.json())
                .then((problem) => {
                  // console.log("!!!!!!!!!@@@@@@@@@@@@@@@@@@@");
                  // console.log(problem);
                  tcproblems.push(problem);
                  pCount++;
                  if (pCount === cDetails["problems"].length) {
                    setcontestProblems(tcproblems);
                    setloadingProblemSubmit(false);
                    setOpen(false);
                  }
                });
            });
          });
      })
      .catch((err) => console.log(err));
  };
  const {classes,cx}= useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDropdownChange = (event) => {
    console.log(event);
    let tagsArray = [];
    event.map((o) => tagsArray.push(o.value));

    setSelectedOptions(tagsArray);
  };
  return (
    <div>
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
        <div className={classes.root}>
          <AppBar
            position="static"
            style={{
              background: "grey",
            }}
          > 
          <br/>
          <br/>
          <br/>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Challenges" {...a11yProps(1)} />
              <Tab label="Settings" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel
            value={value}
            index={0}
            style={{
              display: "auto",
              minHeight: "50rem",
              background: "#424242",
            }}
          >
            {contestsOverview ? (
              <>
                <Row
                  style={{
                    marginTop: "3rem",
                    justifyContent: "space-between",
                  }}
                >
                  <Row
                    style={{
                      marginLeft: "10rem",
                    }}
                  >
                    <Typography
                      style={{
                        color: "white",
                        marginTop: "0.4rem",
                      }}
                      variant="h6"
                    >
                      Name:
                    </Typography>
                    <Typography
                      style={{
                        color: "white",
                        marginLeft: "10px",
                      }}
                      variant="h4"
                    >
                      {contestsOverview.name}
                    </Typography>
                  </Row>
                  <Row
                    style={{
                      marginRight: "10rem",
                    }}
                  >
                    <Typography
                      style={{
                        color: "white",
                        marginTop: "0.4rem",
                      }}
                      variant="h6"
                    >
                      Host:
                    </Typography>
                    <Typography
                      style={{
                        color: "white",
                        marginLeft: "10px",
                      }}
                      variant="h4"
                    >
                      {contestsOverview.Host}
                    </Typography>
                  </Row>
                </Row>
                <Row
                  style={{
                    marginTop: "3rem",
                    justifyContent: "space-between",
                  }}
                >
                  <Row
                    style={{
                      marginLeft: "10rem",
                    }}
                  >
                    <Typography
                      style={{
                        color: "white",
                        marginTop: "0.4rem",
                      }}
                      variant="h6"
                    >
                      Date:
                    </Typography>
                    <Typography
                      style={{
                        color: "white",
                        marginLeft: "10px",
                      }}
                      variant="h4"
                    >
                      {new Date(contestsOverview.Date).toLocaleDateString(
                        "en-US",
                        DATE_OPTIONS
                      )}
                    </Typography>
                  </Row>
                  <Row
                    style={{
                      marginRight: "10rem",
                    }}
                  >
                    <Typography
                      style={{
                        color: "white",
                        marginTop: "0.4rem",
                      }}
                      variant="h6"
                    >
                      Duration:
                    </Typography>
                    <Typography
                      style={{
                        color: "white",
                        marginLeft: "10px",
                      }}
                      variant="h4"
                    >
                      {contestsOverview.Duration}
                    </Typography>
                  </Row>
                </Row>
                <Typography
                  style={{
                    color: "white",
                    marginTop: "8rem",
                  }}
                  variant="h6"
                >
                  Description:
                </Typography>
                <Typography
                  style={{
                    color: "grey",
                    marginTop: "0.4rem",
                    marginLeft: "2rem",
                  }}
                  variant="h6"
                >
                  {contestsOverview.Description}
                </Typography>
              </>
            ) : (
              <>
                <CircularProgress />
              </>
            )}
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            style={{
              display: "auto",
              minHeight: "50rem",
              background: "#424242",
            }}
          >
            {contestProblems.map((problem, i) => {
              // console.log(problem);
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
                      <Link to={"/problem/" + problem._id}>
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
                    <Grid item xs={12}>
                      <Typography component="span">
                        Score: {problem.score}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
            {JSON.parse(localStorage.getItem("profile"))["result"]["_id"] ===
            contestsOverview.hostId ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  style={{
                    color: "white",
                    padding: "1rem 2rem ",
                    borderColor: "white",
                    background: "#006633",
                  }}
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  <Row>
                    <AddIcon />
                    <Typography
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Add a Challenge
                    </Typography>
                  </Row>
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Create Problem
                  </DialogTitle>
                  <DialogContent
                    style={{
                      width: "35rem",
                    }}
                  >
                    <DialogContentText></DialogContentText>
                    <form
                      className={cx(classes.form)}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <label className={classes.label} htmlFor="problemName">
                        Problem Name:
                      </label>

                      <input
                        className={cx(classes.input)}
                        {...register("problemName", {
                          required: "Problem name cannot be empty.",
                        })}
                        id="problemName"
                      />
                      {errors.problemName && (
                        <span className={cx(classes.p)}>
                          {errors.problemName.message}
                        </span>
                      )}

                      <label
                        className={cx(classes.label)}
                        htmlFor="problemStatement"
                      >
                        Problem Statement:{" "}
                      </label>
                      <textarea
                        name="problemStatement"
                        id="problemStatement"
                        placeholder="Enter the problem statement"
                        className={cx(classes.input)}
                        {...register("problemStatement", {
                          required: "Problem statement cannot be empty.",
                        })}
                      ></textarea>
                      {errors.problemStatement && (
                        <span className={cx(classes.p)}>
                          {errors.problemStatement.message}
                        </span>
                      )}
                      <label className={cx(classes.label)} htmlFor="tags">
                        Tags:{" "}
                      </label>
                      <Select
                        id="tags"
                        onChange={handleDropdownChange}
                        className={cx(classes.dropdown)}
                        isMulti
                        options={tags}
                      />
                      <label className={cx(classes.label)} htmlFor="score">
                        Score:
                      </label>
                      <input
                        onChange={handleChange}
                        className={cx(classes.input)}
                        type="number"
                        step="50"
                        {...register("score", {
                          required: "Problem score cannot be empty.",
                          valueAsNumber: true,
                        })}
                        id="score"
                      />
                      <label className={classes.label} htmlFor="sampleInput">
                        Sample input:{" "}
                      </label>
                      <textarea
                        style={{
                          height: "8rem",
                        }}
                        name="sampleInput"
                        id="sampleInput"
                        placeholder="Separate sample inputs using ~                                                                                                                                                       
                            Ex:                                                                                                                                                             
                            abc                                                                                                                                                                                                                                            
                            ~                                                                                                                            
                            def                                                                                                                                           
                            ~"
                        className={classes.input}
                        {...register("sampleInput", {
                          required: "Sample input cannot be empty.",
                        })}
                      ></textarea>
                      <label className={classes.label} htmlFor="sampleInput">
                        Sample output:{" "}
                      </label>
                      <textarea
                        style={{
                          height: "8rem",
                        }}
                        id="sampleOutput"
                        name="sampleOutput"
                        placeholder="Separate sample outputs using ~                                                                                                                                                       
                            Ex:                                                                                                                                                             
                            123                                                                                                                                                                                                                                            
                            ~                                                                                                                            
                            456                                                                                                                                          
                            ~"
                        className={cx(classes.input)}
                        {...register("sampleOutput", {
                          required: "Sample output cannot be empty.",
                        })}
                      ></textarea>
                      <label className={cx(classes.label)} htmlFor="testInputs">
                        Test inputs:{" "}
                      </label>
                      <textarea
                        name="testInputs"
                        id="testInputs"
                        placeholder="Enter Testinputs similar to sample inputs"
                        className={classes.input}
                        {...register("testInputs", {
                          required: "Test inputs cannot be empty.",
                        })}
                      ></textarea>
                      <label className={classes.label} htmlFor="testOutputs">
                        Test outputs:{" "}
                      </label>
                      <textarea
                        name="testOutputs"
                        id="testOutputs"
                        placeholder="Enter Testoutputs similar to sample outputs"
                        className={cx(classes.input)}
                        {...register("testOutputs", {
                          required: "Test outputs cannot be empty.",
                        })}
                      ></textarea>
                      {loadingProblemSubmit ? (
                        <CircularProgress
                          style={{ display: "flex", justifyContent: "center" }}
                          disableShrink
                        />
                      ) : (
                        <input
                          className={classes.submitButton}
                          value="Next"
                          type="submit"
                        />
                      )}
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    {/* <Button onClick={handleClose} color="primary">
                              Subscribe
                            </Button> */}
                  </DialogActions>
                </Dialog>
              </div>
            ) : null}
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            style={{
              display: "auto",
              minHeight: "50rem",
              background: "#424242",
            }}
          >
            <Typography
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
              }}
              variant="h4"
            >
              Work under Progress
            </Typography>
          </TabPanel>
        </div>
      )}
    </div>
  );
};

export default AddContest;
