import React from 'react';
import Notification from './Notification.react';
import List from 'material-ui/lib/lists/list';
import NotificationAction from '../../actions/NotificationActions';
import NotificationStore from '../../stores/NotificationStore';

const NotificationContainer = React.createClass({
  getIntitialState: function() {
    return {
      list: NotificationStore.getList(),
    }
  },
  componentDidMount:function() {
    console.log('Calling !');
    NotificationAction.getList()
    NotificationStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    console.log('Store change updating !!!');
    console.log(NotificationStore.getList());
    this.setState({
      list: NotificationStore.getList()
    });
  },
  _renderNotificationList: function() {
    // if(this.state.list) {
    //   return this.state.list.map((Notification) => {
    //     return (
    //       <div> ajdkadjd</div>
    //       // <Notification key={Notification.id} heading={Notification.heading} time={Notification.time} date={Notification.date} description={Notification.description} />
    //     );
    //   });
    // }
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

