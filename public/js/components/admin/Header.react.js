/**
 * Created by Isuru 1 on 21/01/2016.
 */
import React from 'react';
import { Link } from 'react-router';
import LoginStore from '../../stores/LoginStore';
import HeaderActions from '../../actions/HeaderActions';
import ProfileActions from '../../actions/admin/ProfileActions';
import ProfileStore from '../../stores/admin/ProfileStore';
const path = '../../../../img/profilepics/';
var Header = React.createClass({
  getInitialState: function () {
    return ProfileStore.getuserdata();
  },

  componentDidMount: function () {
    var user1 = localStorage.getItem('id');
    socket.emit('LoggedUser', user1);
    ProfileStore.addChangeListener(this._onChange);
    ProfileActions.getAdminProfileData();
    document.getElementById('rerender').click();
  },

  _onChange: function () {
    this.setState(ProfileStore.getuserdata());
  },

  update:function () {
    setTimeout(function () {
      if (window.location.href.substr(-2) !== '?r') {
        window.location = window.location.href + '?r';
        history.go(0);
      }
    }, 400);
  },

  render: function () {
    return (
      <div>
        <header className="main-header">
          <div>
              <a className="logo" role="button" >
                <div className="logo-mini">
                  <b>A</b>
                  LT</div>

                <div className="logo-lg">
                  <b>Admin</b>
                  CP</div>
              </a>
          </div>
          <nav className="nav bar navbar-static-top" role="navigation">
            <a  className="sidebar-toggle" data-toggle="offcanvas" id="rerender" onCick={this.update} role="button" >
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown notifications-menu">
                  <a  className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-bell-o"></i>
                    <span className="label label-warning">10</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 10 notifications</li>
                    <li>

                      <ul className="menu">
                        <li>
                          <a >
                            <i className="fa fa-users text-aqua"></i>
                            5 new members joined today
                          </a>
                        </li>
                        <li>
                          <a >
                            <i className="fa fa-warning text-yellow"></i>
                            Very long description here that may not fit into the page and may cause design problems
                          </a>
                        </li>
                        <li>
                          <a >
                            <i className="fa fa-users text-red"></i>
                            5 new members joined
                          </a>
                        </li>
                        <li>
                          <a >
                            <i className="fa fa-shopping-cart text-green"></i>
                            25 sales made
                          </a>
                        </li>
                        <li>
                          <a >
                            <i className="fa fa-user text-red"></i>
                            You changed your username
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="footer">
                      <a >View all</a>
                    </li>
                  </ul>
                </li>


                <li className="dropdown user user-menu">
                  <a  className="dropdown-toggle" data-toggle="dropdown">
                    <img src={path + this.state.profilepic} className="user-image" alt="User Image"/>
                    <span className="hidden-xs">{this.state.firstname}</span>
                  </a>
                  <ul className="dropdown-menu">

                    <li className="user-header">
                      <img src={path + this.state.profilepic} className="img-circle" alt="User Image"/>
                      <p>
                        {this.state.firstname} {this.state.lastname} - {this.state.job}
                        <small>Member since {this.state.created_at}</small>
                      </p>
                    </li>
                    <li className="user-footer">
                      <div className="pull-left">
                        <a  className="btn btn-default btn-flat">Profile</a>
                      </div>
                      <div className="pull-right">
                        <Link to={`/AdminSignout`}>
                          <a className="btn btn-default btn-flat">Sign out</a>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>

                <li>
                  <a data-toggle="control-sidebar">
                    <i className="fa fa-gears"></i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

        </header>
      </div>
    );
  },
});

export default Header;
