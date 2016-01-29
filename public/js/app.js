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
import Login from './components/login/Login.react';
import Profile from './components/profile/profile.react';
import Register from './components/register/Register.react';
import ActivityContainer from './components/profile/ActivityFeed/ActivityFeedContainer.react';
import About from './components/profile/About.react';
import Photos from './components/profile/visitor/Photos.react';
import ProfileVisitor from './components/profile/visitor/profile.react';
import ActivityContainerVisitor from './components/profile/visitor/ActivityFeed/ActivityFeedContainer.react';
import AboutVisitor from './components/profile/visitor/About.react';
import PhotosVisitor from './components/profile/visitor/Photos.react';
import Search from './components/search/Search.react';
import Admin from './components/admin/dashboard.react';
import AdminLogin from './components/admin/login.react';
<<<<<<< HEAD
import MainChat from './components/chat/ChatMain.react';
import MainActivity from './components/activityfeed/activityMain.react';
=======
import Threads from './components/chat/Threads.react';
import users from './components/admin/users/userHome.react';
import friends from './components/admin/users/friends.react';
import enemies from './components/admin/users/enemies.react';
import Cards from './components/admin/Cards.react';
>>>>>>> 0a0a2794d6fc99b2a26d6c598c1bbdc5c4496505

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
  console.log('Sign out !');
  localStorage.removeItem('apitoken');
  localStorage.removeItem('user');
  document.location = "/#/login";
}

ReactDOM.render((
  <Router history={hashHistory}>
<<<<<<< HEAD
    <Route path="/login" component={Home} />
    <Route path="/dashboard" component={Admin} />
    <Route path="chat" component={MainChat}/>
=======
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
>>>>>>> 0a0a2794d6fc99b2a26d6c598c1bbdc5c4496505
    <Route path="/AdminLogin" component={AdminLogin} />
    <Route path="/dashboard" component={Admin} onEnter={requireAdminAuth}>
        <Route path="/users" component={users} >
            <Route path="friends" component={friends} />
            <Route path="enemies" component={enemies} />
        </Route>
        <Route path="/cards" component={Cards} />
    </Route>
    <Route path="/" component={Header} onEnter={requireAuth}>
<Route path="activity" component={MainActivity}/>
      <Route path="/search" component={Search} />
      <Route path="/threads" component={Threads} />
      <Route path="profile" component={Profile} >
      	<Route path="activityfeed" component={ActivityContainer} />
      	<Route path="about" component={About} />
        <Route path="photos" component={Photos} />
      </Route>
      <Route path="/:username" component={ProfileVisitor} >
        <Route path="activityfeed" component={ActivityContainerVisitor} />
        <Route path="about" component={AboutVisitor} />
        <Route path="photos" component={PhotosVisitor} />
      </Route>
    </Route>
      <Route path="/signout" onEnter={signout} />
  </Router>
  ),
  document.getElementById('content')
);
