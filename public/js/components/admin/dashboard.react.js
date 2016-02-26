import React from 'react';
import Header from './Header.react';
import Sidebar from './Sidebar.react';
import Settings from './Settings.react';
import Path from './path.react';
import { Router, Route, Link, hashHistory } from 'react-router';

var Admin = React.createClass({
  forceUpdate: function () {
    location.reload();
  },

  render: function () {
    return (
      <div>
        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">
            <Header/>
            <Sidebar/>
            <div className="content-wrapper">
              <Path/>
              <section className="content">
                {this.props.children}
              </section>
            </div>
            <div id="main">
            <Settings />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default Admin;
