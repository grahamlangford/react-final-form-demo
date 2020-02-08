import React from 'react'

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/deepOrange'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import LightIcon from '@material-ui/icons/Brightness7'
import DarkIcon from '@material-ui/icons/Brightness4'
import Container from '@material-ui/core/Container'

import Form from './Form'

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796b'
    },
    secondary: deepOrange
  }
})

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796b'
    },
    secondary: deepOrange,
    type: 'dark'
  }
})

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}))

function App() {
  const classes = useStyles()
  const [darkMode, setDarkMode] = React.useState(false)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" className={classes.title}>
            React Final Form Todos
          </Typography>
          <Tooltip title="toggle light/dark mode">
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <DarkIcon /> : <LightIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container>
        <Form />
      </Container>
    </ThemeProvider>
  )
}

export default App
