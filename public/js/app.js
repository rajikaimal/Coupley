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
import AdminLogin from './components/admin/login.react';
import users from './components/admin/users/userHome.react';
import Cards from './components/admin/Cards.react';
import friends from './components/admin/users/friends.react';
import enemies from './components/admin/users/enemies.react';

function requireAuth(nextState, replace) {
  if(! localStorage.getItem('apitoken')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
function requireAdminAuth(nextState, replace) {
    if(! localStorage.getItem('apitoken')) {
        replace({
            pathname: '/AdminLogin',
            state: { nextPathname: nextState.location.pathname }
        })
    }

}

function signout() {
  localStorage.removeItem('apitoken');
  localStorage.removeItem('user');
  document.location = "/#/login";
}

function AdminSignout() {
    localStorage.removeItem('apitoken');
    localStorage.removeItem('user');
    document.location = "/cp-admin#/AdminLogin";
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/login" component={Home} />
    <Route path="/AdminLogin" component={AdminLogin} />
      <Route path="/dashboard" component={Admin} onEnter={requireAdminAuth}>
          <Route path="/users" component={users} >
              <Route path="friends" component={friends} />
              <Route path="enemies" component={enemies} />
          </Route>
          <Route path="/cards" component={Cards} />
      </Route>
    <Route path="/" component={Header} onEnter={requireAuth}>
      <Route path="/search" component={Search} />
      <Route path="profile" component={Profile} >
      	<Route path="activityfeed" component={ActivityContainer} />
      	<Route path="about" component={About} />
        <Route path="photos" component={Photos} />
      </Route>
    </Route>
    <Route path="/signout" onEnter={signout} />
      <Route path="/AdminSignout" onEnter={AdminSignout} />
  </Router>
  ),
  document.getElementById('content')
);
