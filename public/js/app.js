/**
 Coupley entry point for webpack
 */

//es6 imports
import React from 'react';
import ReactDOM from 'react-dom';
//Router components
import { Router, Route, Link, hashHistory } from 'react-router';

import Header from './components/base/Header.react';
import Home from './components/Home.react';
import Profile from './components/profile/profile.react';
import ActivityContainer from './components/profile/ActivityFeed/ActivityFeedContainer.react';
import About from './components/profile/About.react';
import Photos from './components/profile/Photos.react';
import Search from './components/Search.react';
import Admin from './components/admin/dashboard.react';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/login" component={Home} />
    <Route path="/cp-admin" component={Admin} />
    <Route path="/" component={Header}>
      <Route path="/search" component={Search} />
      <Route path="profile" component={Profile} >
      	<Route path="activityfeed" component={ActivityContainer} />
      	<Route path="about" component={About} />
        <Route path="photos" component={Photos} />
      </Route>
    </Route>
  </Router>
  ),
  document.getElementById('content')
);
