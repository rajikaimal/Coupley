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

                <li className="dropdown messages-menu">
                  <a  className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-envelope-o"></i>
                    <span className="label label-success">4</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 4 messages</li>
                    <li>
                      <ul className="menu">
                        <li>
                          <a >
                            <div className="pull-left">
                              <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              Support Team
                              <small>
                                <i className="fa fa-clock-o"></i>
                                5 mins</small>
                            </h4>
                            <p>Why not buy a new awesome theme</p>
                          </a>
                        </li>
                        <li>
                          <a >
                            <div className="pull-left">
                              <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              AdminLTE Design Team
                              <small>
                                <i className="fa fa-clock-o"></i>
                                2 hours</small>
                            </h4>
                            <p>Why not buy a new awesome theme</p>
                          </a>
                        </li>
                        <li>
                          <a>
                            <div className="pull-left">
                              <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              Developers
                              <small>
                                <i className="fa fa-clock-o"></i>
                                Today</small>
                            </h4>
                            <p>Why not buy a new awesome theme</p>
                          </a>
                        </li>
                        <li>
                          <a>
                            <div className="pull-left">
                              <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              Sales Department
                              <small>
                                <i className="fa fa-clock-o"></i>
                                Yesterday</small>
                            </h4>
                            <p>Why not buy a new awesome theme</p>
                          </a>
                        </li>
                        <li>
                          <a >
                            <div className="pull-left">
                              <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <h4>
                              Reviewers
                              <small>
                                <i className="fa fa-clock-o"></i>
                                2 days</small>
                            </h4>
                            <p>Why not buy a new awesome theme</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="footer">
                      <a >See All Messages</a>
                    </li>
                  </ul>
                </li>

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

                <li className="dropdown tasks-menu">
                  <a  className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-flag-o"></i>
                    <span className="label label-danger">9</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 9 tasks</li>
                    <li>
                      <ul className="menu">
                        <li>
                          <a >
                            <h3>
                              Design some buttons
                              <small className="pull-right">20%</small>
                            </h3>
                            <div className="progress xs">
                              <div className="progress-bar progress-bar-aqua" styles={'width: 20%'} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">20% Complete</span>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a >
                            <h3>
                              Create a nice theme
                              <small className="pull-right">40%</small>
                            </h3>
                            <div className="progress xs">
                              <div className="progress-bar progress-bar-green" styles={'width: 40%'} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">40% Complete</span>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a >
                            <h3>
                              Some task I need to do
                              <small className="pull-right">60%</small>
                            </h3>
                            <div className="progress xs">
                              <div className="progress-bar progress-bar-red" styles={'width: 60%'} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">60% Complete</span>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a >
                            <h3>
                              Make beautiful transitions
                              <small className="pull-right">80%</small>
                            </h3>
                            <div className="progress xs">
                              <div className="progress-bar progress-bar-yellow" styles={'width: 80%'} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">80% Complete</span>
                              </div>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="footer">
                      <a >View all tasks</a>
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
