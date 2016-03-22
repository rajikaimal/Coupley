/**
 * Created by Isuru 1 on 21/01/2016.
 */

import React from 'react';
import { Link } from 'react-router';
import TextField from 'material-ui/lib/text-field';
import ProfileActions from '../../actions/admin/ProfileActions';
import ProfileStore from '../../stores/admin/ProfileStore';

const path = '../../../../img/profilepics/';
const formcontol = {
  display: 'block',
  width: '100%',
  height: '34px',
  padding: '2px 12px',
  fontSize: '14px',
  lineHeight: '1.42857143',
  color: '#555',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  WebkitBoxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .075)',
  boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .075)',
  WebkitTransition: 'border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s',
  OTransition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
  transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
};
var Sidebar = React.createClass({
  getInitialState: function () {
    return ProfileStore.getuserdata();
  },

  componentDidMount: function () {
    ProfileActions.getAdminProfileData();
    ProfileStore.addChangeListener(this._onChange);
  },

  _changeURL: function () {
    document.location = 'cp-admin#/searches';
  },

  _search: function () {
    let searchkey = this.refs.search.value;
    ProfileActions.getsearchresults(searchkey);
  },

  _onChange: function () {
    this.setState(ProfileStore.getuserdata());
  },

  render: function () {
    return (
      <div>
        <aside className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img src={path + this.state.profilepic} className="img-circle" alt="User Image"/>
              </div>
              <div className="pull-left info">
                <p>
                  <a>
                    <i className="fa fa-circle text-success"></i>
                  </a>
                   {this.state.firstname} {this.state.lastname}
                </p>
              </div>
            </div>
            <form action="#" method="get" className="sidebar-form">
              <div className="input-group">
                <input type="text" style={formcontol} placeholder="Search"
                       onClick={this._changeURL} onKeyUp={this._search} ref="search"/>
                <span className="input-group-addon">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </form>
            <ul className="sidebar-menu">
              <li className="header">MAIN NAVIGATION</li>
              <li>
                <Link to={`/cards`}>
                  <i className="fa fa-dashboard"></i>
                  <span>Dashboard</span>
                </Link>

              </li>

              <li>
                <Link to={`/users`}>
                  <i className="fa ion-earth"></i>
                  <span>Privacy</span>
                  <small className="label pull-right bg-green">new</small>
                </Link>
              </li>

              <li>
                <Link to={`/feedback`}>
                  <i className="fa ion-social-rss"></i>
                  <span>Feedbacks</span>
                  <small className="label pull-right bg-red">3</small>
                </Link>
              </li>
              <li className="treeview">
                <Link to={`/settings`}>
                  <i className="fa fa-gears"></i>
                  <span>Settings</span>
                </Link>

              </li>

            </ul>
          </section>

        </aside>
      </div>
    );
  },
});

export default Sidebar;
