import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { styled } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { amber, grey } from "@material-ui/core/colors";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import HowToVote from '@material-ui/icons/HowToVote';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextLink from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
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

const Footer = styled(Box)({
  display: "flex",
  position: "absolute",
  bottom: "8px",
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: grey["600"]
});

const Flex = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "12px"
});

const headerButtonStyle =
{
  textTransform: 'none',
  padding: 0
};

ReactDOM.render(
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
      <Footer>
        <Typography variant="subtitle2">© 2021 Sienori </Typography>
        <Flex clone>
          <TextLink href="https://github.com/sienori/Voter/"
            target="_blank" rel="noopener" color="inherit">
            <Box mr="3px" clone><GitHubIcon style={{ fontSize: "16px" }} /></Box>
            <Typography variant="subtitle2">GitHub</Typography>
          </TextLink>
        </Flex>
      </Footer>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
