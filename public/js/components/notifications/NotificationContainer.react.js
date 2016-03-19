import React from 'react';
import Notification from './Notification.react';
import List from 'material-ui/lib/lists/list';
import NotificationAction from '../../actions/NotificationActions';
import NotificationStore from '../../stores/NotificationStore';

const NotificationContainer = React.createClass({
  getIntitialState: function() {
    return {
      listNotification: NotificationStore.getList(),
    }
  },
  componentDidMount:function() {
    NotificationStore.addChangeListener(this._onChange);
    NotificationAction.getList();
  },
  _onChange: function() {
    this.setState({
      listNotification: NotificationStore.getList()
    });
  },
  _renderNotificationList: function() {
    return this.state.listNotification.map((Notification) => {
      return (
        <div> ajdkadjd</div>
      );
    });
  },
  render: function() {
    return (
      <div>
		    <List subheader="Notifications">
        	<div> Notification </div>
          {this._renderNotificationList()}
        </List>
      </div>
    );
  }
});

export default NotificationContainer;

