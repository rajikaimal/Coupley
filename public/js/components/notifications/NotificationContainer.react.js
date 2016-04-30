import React from 'react';
import Notification from './Notification.react';
import List from 'material-ui/lib/lists/list';
import NotificationAction from '../../actions/NotificationActions';
import NotificationStore from '../../stores/NotificationStore';

const NotificationContainer = React.createClass({
  getInitialState: function() {
    return {
      listNotification: NotificationStore.getList(),
    }
  },
  componentDidMount:function() {
    console.log('Freaking mounted !');
    NotificationStore.addChangeListener(this._onChange);
    NotificationAction.getList();
  },
  _onChange: function() {
    this.setState({
      listNotification: NotificationStore.getList()
    });
  },
  _loadMore: function() {
    NotificationAction.loadMore();
  },
  _renderNotificationList: function() {
    let self = this;
    return this.state.listNotification.map((Notification) => {
      console.log(Notification);
      return (
        <div>
          <div>
            <img height="25" width="25" src={'/img/profilepics/' + Notification.profilepic } /> <a href={'/#/' + Notification.username + '/about' }>{Notification.name} {Notification.content == 'like' ? 'liked you' : ''} </a> 
          </div>
          <br />
        </div>
      );
    });
  },
  render: function() {
    return (
      <div>
		    <List>
        	<div> Notifications </div>
          <br/>
          {this._renderNotificationList()}
        </List>
        <div> <button onClick={this._loadMore}>load more </button></div>
      </div>
    );
  }
});

export default NotificationContainer;

