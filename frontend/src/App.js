
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useEffect } from 'react';
import Drawer from './components/Drawer';
import { createBrowserHistory } from 'history';
import { ThemeProvider, createTheme } from '@mui/material';
import theme from './Theme';

const App = (props) => {

  useEffect(() => {
    document.title = "GoCode"
    document.body.style = 'background: black';
  }, []);

  // const theme=createTheme(
  //   {palette :{
  //     mode :'light'
  //   },
  //   // spacing : 20

  //   }
  // )

  // const URL = "https://media.istockphoto.com/photos/middle-age-man-portrait-picture-id1285124274?b=1&k=20&m=1285124274&s=170667a&w=0&h=tdCWjbu8NxR_vhU3Tri7mZcfUH6WdcYWS1aurF4bbKI="
  return (
    <ThemeProvider theme={theme}>

   
    <Router history={createBrowserHistory()}>
      <Drawer />
    </Router>

    </ThemeProvider>
  );
}

export default App;
