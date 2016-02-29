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
import Quiz from './components/quiz/Quiz.react';
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
import MainActivity from './components/activityfeed/activityMain.react';
import MainActivityProfile from './components/profile/activityfeed/activityMain.react';
import Threads from './components/chat/Threads.react';
import Users from './components/admin/users/userHome.react';
import Friends from './components/admin/users/friends.react';
import Enemies from './components/admin/users/enemies.react';
import Cards from './components/admin/Cards.react';
import Settings from './components/admin/settings/settings.react';
import Forgot from './components/Forgot.react';
import AdminForgot from './components/admin/AdminForgotPwd.react';
import Feedback from './components/admin/feedback/FeedbackHome.react';
import Timeline from './components/admin/feedback/timeline.react';
import ActivityFeed from './components/admin/feedback/activity.react';
import Privacy from './components/admin/feedback/privacy.react';
import ChatFeed from './components/admin/feedback/chat.react';
import OthersFeed from './components/admin/feedback/others.react';
import Graph from './components/admin/graphs/graph.react';
import PieGraph from './components/admin/graphs/piechart.react';

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('apitoken')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function requireAdminAuth(nextState, replace) {
  if (!localStorage.getItem('apitoken')) {
    replace({
      pathname: '/AdminLogin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function logout() {
  console.log('Sign out !');
  localStorage.removeItem('apitoken');
  localStorage.removeItem('user');
  document.location = '/#/login';
}

function AdminSignout() {
  localStorage.removeItem('apitoken');
  localStorage.removeItem('emails');
  document.location = '/cp-admin#/AdminLogin';
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/login" component={Login} />
      <Route path="/logout" onEnter={logout} />
      <Route path="/dashboard" component={Admin} />
      <Route path="/forgotpwd" component={Forgot} />
    <Route path="/register" component={Register} />
    <Route path="/quiz" component={Quiz} />
    <Route path="/AdminLogin" component={AdminLogin} />
      <Route path="/Adminforgotpwd" component={AdminForgot} />
    <Route path="/dashboard" component={Admin} onEnter={requireAdminAuth}>
        <Route path="/users" component={Users}>
            <Route path="friends" component={Friends} />
            <Route path="enemies" component={Enemies} />
        </Route>
        <Route path="/feedback" component={Feedback}>
            <Route path="timeline" component={Timeline} />
            <Route path="activity" component={ActivityFeed} />
            <Route path="privacy" component={Privacy} />
            <Route path="chat" component={ChatFeed} />
            <Route path="others" component={OthersFeed} />
        </Route>
        <Route path="/cards" component={Cards} />
        <Route path="/settings" component={Settings} />
    </Route>
      <Route path="/graph" component={Graph} />
      <Route path="/piegraph" component={PieGraph} />
      <Route path="/AdminSignout" onEnter={AdminSignout} />
    <Route path="/" component={Header} onEnter={requireAuth}>
      <Route path="/search" component={Search} />
      <Route path="/threads" component={Threads} />
        <Route path="activity" component={MainActivity}/>
      <Route path="profile" component={Profile} >
          <Route path="activityfeed" component={MainActivityProfile} />
          <Route path="about" component={About} />
        <Route path="photos" component={Photos} />
      </Route>
      <Route path="/:username" component={ProfileVisitor} >
        <Route path="activityfeed" component={ActivityContainerVisitor} />

        <Route path="about" component={AboutVisitor} />
        <Route path="photos" component={PhotosVisitor} />
      </Route>
    </Route>

  </Router>
  ),
  document.getElementById('content')
);

