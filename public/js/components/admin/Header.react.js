/**
 * Created by Isuru 1 on 21/01/2016.
 */
import React from 'react';
import { Link } from 'react-router';
import LoginStore from '../../stores/LoginStore';
import HeaderActions from '../../actions/HeaderActions';
import ProfileActions from '../../actions/admin/ProfileActions';
import ProfileStore from '../../stores/admin/ProfileStore';
import NotificationAction from  '../../actions/admin/AdminNotificationActions';
import NotificationStore from '../../stores/NotificationStore';

const path = '../../../../img/profilepics/';
var Header = React.createClass({
  getInitialState: function () {
    return {
      data:ProfileStore.getuserdata(),
      notificationCount:NotificationStore.getNumber(),
      listNotification: NotificationStore.getList(),
    };
  },

  componentDidMount: function () {
    var user1 = localStorage.getItem('id');
    socket.emit('LoggedUser', user1);
    ProfileActions.getAdminProfileData();
    ProfileStore.addChangeListener(this._onChange);
    NotificationAction.getList();
    NotificationStore.addChangeListener(this._onChangeList);
    NotificationAction.getInitialNo();
    NotificationStore.addChangeListener(this._onChangeNotification);

    var self = this;
    socket.on('notifyRegistration', function (data) {
      NotificationAction.updateListFromSocket(data);
      self.setState({
        notificationCount: ++self.state.notificationCount,
      });
    });
  },

  _onChange: function () {
    this.setState(ProfileStore.getuserdata());
  },

  setOne:function () {
    NotificationAction.setOne();
    NotificationStore.addChangeListener(this._onChangeNotification);
  },

  _onChangeNotification: function () {
    this.setState({
      notificationCount: NotificationStore.getNumber(),
    });
  },

  _onChangeList: function () {
    this.setState({
      listNotification: NotificationStore.getList(),
    });
  },

  _renderNotificationList: function () {
    let self = this;
    if (this.state.listNotification.length == 0) {
      return (
          <li>
            <a >
              No notifications.
            </a>
          </li>
      );
    } else {
      return this.state.listNotification.map((Notification) => {
        return (
            <li>
              <a>
                <i className="fa fa-users text-aqua"></i>
                {Notification.content}
              </a>
            </li>
        );
      });
    }
  },

  update:function () {
    setTimeout(function () {
      if (window.location.href.substr(-2) !== '?r') {
        window.location = window.location.href + '?r';
        history.go(0);
      }
    }, 400);
  },

  counts:function () {
    if (this.state.notificationCount.count == 0) {
      return ('0');
    } else {
      return (this.state.notificationCount.toString());
    }
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
            <a  className="sidebar-toggle" data-toggle="offcanvas" id="rerender"
                onCick={this.update} role="button" >
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown notifications-menu" onClick={this.setOne}>
                  <a  className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-bell-o"></i>
                    <span className="label label-warning">{this.counts()}</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have {this.counts()} notifications
                    </li>
                    <li>
                      <ul className="menu">
                        {this._renderNotificationList()}
                      </ul>
                    </li>
                    <li className="footer">
                    </li>
                  </ul>
                </li>


                <li className="dropdown user user-menu">
                  <a  className="dropdown-toggle" data-toggle="dropdown">
                    <img src={path + this.state.profilepic} className="user-image"
                         alt="User Image"/>
                    <span className="hidden-xs">{this.state.firstname}</span>
                  </a>
                  <ul className="dropdown-menu">

                    <li className="user-header">
                      <img src={path + this.state.profilepic} className="img-circle"
                           alt="User Image"/>
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
