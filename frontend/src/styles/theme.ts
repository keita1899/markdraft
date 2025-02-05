import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
  palette: {
    primary: {
      main: '#212121',
    },
    background: {
      default: '#F9F9F9',
      paper: '#f0f0f0',
    },
    text: {
      primary: '#000',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#212121',
          color: '#fff',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#9e9e9e',
          '&:hover': {
            backgroundColor: '#757575',
          },
        },
      },
    },
  },
})

export default theme
