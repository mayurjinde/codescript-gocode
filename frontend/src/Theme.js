import { createTheme } from '@mui/material/styles';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Adjust the primary color as needed
    },
    secondary: {
      main: '#dc004e', // Adjust the secondary color as needed
    },
    background: {
      default: '#212121', // Adjust the default background color as needed
    },
  },
//   spacing:'20',
  typography: {
    // You can define typography styles here if needed
  },
  mixins: {
    toolbar: {
      minHeight: '56px', // Adjust the toolbar height as needed
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        display: 'flex',
        zIndex: 1201, // Adjust the z-index as needed
        transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms', // Adjust the transition duration as needed
      },
    },
    MuiToolbar: {
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0',
      },
    },
    MuiDrawer: {
      root: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms', // Adjust the transition duration as needed
      },
      paper: {
        width: drawerWidth,
      },
    },
    MuiIconButton: {
      root: {
        marginRight: '36px', // Adjust the margin as needed
      },
    },
    MuiInputBase: {
      root: {
        color: 'inherit',
      },
      input: {
        padding: '8px 12px',
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        width: '100%',
        // Adjust the input width for different breakpoints as needed
        '@media (min-width: 600px)': {
          width: '20ch',
        },
      },
    },
  },
});

export default theme;
