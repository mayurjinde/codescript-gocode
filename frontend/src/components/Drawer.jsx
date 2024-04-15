import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import clsx from "clsx";
import {  useTheme, alpha } from "@mui/material/styles";

import { Plag } from "./PlaigarismChecker/Plag";

import { makeStyles } from 'tss-react/mui';
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Assignment } from "@mui/icons-material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { Route, Routes, Navigate } from "react-router-dom";
import ProblemSpace from "./ProblemSpace/problemSpace";
import Profile from "./Profile/Profile";
import AttemptedProblems from "./Profile/AttemptedProblems";
import Problem from "./ProblemSpace/problem";
import Auth from "./Auth/Auth";
import MoreIcon from "@mui/icons-material/MoreVert";
import ContestSpace from "./ContestSpace/ContestSpace";
import PlaylistSpace from "./PlaylistSpace/PlaylistSpace";
import AddContest from "./ContestSpace/AddContest";
import AddPlaylist from "./PlaylistSpace/AddPlaylist";
import AddProblem from "./ContestSpace/AddProblem";
import { useNavigate } from "react-router";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from "@material-ui/icons/Search";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import * as actionType from "../constants/actionTypes";
import Submissions from "./ProblemSpace/Submisssions";
import Pds from "./PersonalDevelopementSpace/pds";
import ContestIndex from "./ContestSpace/ContestIndex";
import logo from "../constants/logo.png";
import { CodeSimilarity } from "./PlaigarismChecker/CodeSimilarity";
import { PlagResult } from "./PlaigarismChecker/PlagResult";
import { io } from "socket.io-client";
import { domain } from "../constants/config";
import { LeaderBoard } from "./ContestSpace/LeaderBoard";
import { AiDetection } from "./PlaigarismChecker/AiDetection";

const drawerWidth = 300;

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));





export default function MiniDrawer(props) {
  console.log("hey i am working");
  const history = useNavigate();
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    console.log('mobile detected')
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  user != null ? console.log(user["result"]["name"]) : console.log("no user");

  const {classes,cx} = useStyles();
  const [hover, setHover] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  

  
  const handleDrawerOpen = () => {
    setOpen(true);
    
  
  };

  const handleDrawerClose = () => {
    
    setOpen(false);

    
  };
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history("/auth");

    setUser(null);
  };
  const location = useLocation();
  useEffect(() => {
    const token = user?.token;
  
    const socket=io(`${domain}`)
     
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleMouseIn = () => {
    console.log("called");
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const tooltipStyle = {
    display: hover ? "block" : "none",
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={cx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={cx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          {/* <Link to="/"> */}
          <img src={logo} alt="Logo" width="40" height="40" />
          <Typography
            className={classes.title}
            onClick={() => history("/")}
            variant="h6"
            noWrap
            style={{
              paddingLeft: "1rem",
            }}
          >
            GoCode
          </Typography>
          {/* </Link> */}
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {user != null ? (
              // <Typography variant="h6">{user?.result.name}</Typography>
              <Button
                variant="outlined"
                style={{ color: "white", borderColor: "white" }}
                onClick={logout}
              >
                Logout{" "}
              </Button>
            ) : (
              <a href="/auth">
                <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    borderColor: "white",
                    marginTop: "0.5rem",
                  }}
                >
                  Login{" "}
                </Button>
              </a>
            )}

            {/* {user['result']['name']!=null ?<Button variant="outlined" style={{color:'white'} } onClick={logout}>Logout </Button>:<a href="/auth"><Button variant="outlined" style={{color:'white'} }>Login </Button></a>} */}
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Link to={"/profile"}>
                <AccountCircle />
              </Link>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
           
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        // variant="permanent"
        className={cx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper:cx( {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}

        open={open}


        
      >
        <div className={cx(classes.toolbar)}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {/* <List>
          {['Problem Space', 'Contest Space', 'User Space', 'PlayList of Problems'].map((text, index) => (
            <ListItem button key={text} onClick={()=>props.history.push('/problems')}>
              <ListItemIcon>{index === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        {/* <div>hello</div> */}
        <div title="Problem space">
          <ListItem
            button
            key={"Problem Space"}
            onClick={() => history("/problems")}
          >
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Problem Space" />
          </ListItem>
        </div>
        <div title="Contest Space">
          <ListItem
            button
            key={"Contest Space"}
            onClick={() => history("/contests")}
          >
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Contest Space" />
          </ListItem>
        </div>
        <div title="Personal Development Space">
          <ListItem
            button
            key={"Personal Development Space"}
            onClick={() => history("/pds")}
          >
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Personal Development Space" />
          </ListItem>
        </div>
        <div title="Playlist of Problems">
          <ListItem
            button
            key={"Playlist of Problems"}
            onClick={() => history("/playlists")}
          >
            <ListItemIcon>
              <FeaturedPlayListIcon />
            </ListItemIcon>
            <ListItemText primary="Playlist of Problems" />
          </ListItem>
        </div>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        
        // style={{
        //   paddingTop:"100px"
        // }}
      
      className={classes.content}>
        <div className="App">
          <Routes>
            <Route path="/auth" exact element={<Auth/>} />
            <Route exact path="/" element={ <Navigate replace to="/problems" />}/>
              
           

            <Route exact path="/problems" element={<ProblemSpace/>} />

            <Route exact path="/profile" element={<Profile/>} />
              
           

            <Route exact path="/profile/problems" element={<ProblemSpace/>} />
              
            

            <Route exact path="/contests" element={<ContestSpace/>} />
            <Route exact path="/pds" element={<Pds/>} />
            {/* <Route exact path='/contests' component={ContestSpace}>
            <ContestSpace />
          </Route> */}
            <Route exact path="/contests/:id" element={<AddContest/>} />
            <Route exact path="/playlists" element={<PlaylistSpace/>} />
            <Route exact path="/addcontest/:id" element={<AddContest/>} />
            <Route exact path="/addplaylist/:id" element={<AddPlaylist/>} />
            <Route exact path="/addproblem" element={<AddProblem/>} />
            <Route exact path="/codeSimilarity"  element={<CodeSimilarity/>}/>

            <Route exact path="/codeSimilarity/:id"  element={<PlagResult/>}/>
            <Route exact path="/aiDetection" element={<AiDetection/>}/>

            <Route exact path="/plagCheck" element={<Plag/>}/>
          <Route exact path=":contestId/problem/:id" element={<Problem/>} />

          <Route exact path=":contestId/leaderBoard" element={<LeaderBoard/>} />

            <Route exact path="/problem" >
           

            <Route exact path=":id" element={<Problem/>}/>
             </Route>


            <Route exact path="/submissions" >
             <Route exact path=":id" element={<Submissions/>}>

             </Route>
     
              </Route>
              
            

            <Route exact path="/contests/:id/index" element={<ContestIndex/>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
