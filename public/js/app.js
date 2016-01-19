/**
 Coupley entry point for webpack
 */

//es6 imports
import React from 'react';
import ReactDOM from 'react-dom';
//Router components 
import { Router, Route, Link, hashHistory } from 'react-router'
//starting component
import Starter from './components/Starter.react';
import Login from './components/Login.react';
import Header from './components/base/Header.react';
import Profile from './components/profile/profile.react';
import ActivityContainer from './components/profile/ActivityFeed/ActivityFeedContainer.react';
import About from './components/profile/About.react';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Header}>
      <Route path="profile" component={Profile} >
      	<Route path="activityfeed" component={ActivityContainer} />
      	<Route path="about" component={About} />
      </Route>
    </Route>
  </Router>
  ),
  document.getElementById('content')
);
