import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { styled } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { amber } from "@material-ui/core/colors";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import HowToVote from '@material-ui/icons/HowToVote';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Home from './pages/Home';
import Post from './pages/Post';
import Vote from './pages/Vote';
Amplify.configure(config);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber["500"]
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const Main = styled(Container)({
  paddingTop: "30px",
  maxWidth: 600,
  margin: "auto"
});

const headerButtonStyle =
{
  textTransform: 'none',
  padding: 0
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar position="relative" color="primary">
          <Toolbar>
            <Button
              component={Link}
              to="/"
              style={headerButtonStyle}>
              <Box mr={1} clone><HowToVote /></Box>
              <Typography variant="h5">Voter</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/vote/:id" component={Vote} />
            <Redirect to="/" />
          </Switch>
        </Main>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
