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
  _renderNotificationList: function() {
    let self = this;
    console.log('render method');
    console.log('logging state');
    console.log(this.state.listNotification);
    return this.state.listNotification.map((Notification) => {
      return (
        <div>
          {Notification.content}
        </div>
      );
    });
  },
  render: function() {
    return (
      <div>
        <List>
          <div> Notification </div>
          {this._renderNotificationList()}
        </List>
      </div>
    );
  }
});

export default NotificationContainer;