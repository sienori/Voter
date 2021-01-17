import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home';
import Post from './pages/Post';
import Vote from './pages/Vote';
Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/post" component={Post} />
      <Route exact path="/vote/:id" component={Vote} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
