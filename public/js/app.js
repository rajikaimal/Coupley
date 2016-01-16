/**
 Coupley entry point for webpack
 */

//es6 imports
import React from 'react';
import ReactDOM from 'react-dom';
//Router components 
import { Router, Route, Link, browserHistory } from 'react-router'
//starting component
import Starter from './components/Starter.react';
import Login from './components/Login.react';
import Header from './components/base/Header.react';
import Profile from './components/profile/profile.react';
import $ from 'jquery';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Header}>
      <Route path="profile" component={Profile} />
    </Route>
  </Router>
  ),
  document.getElementById('content')
);
