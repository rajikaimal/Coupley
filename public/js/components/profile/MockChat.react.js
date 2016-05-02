import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Toggle from 'material-ui/lib/toggle';
import ThreadActions from '../../actions/Thread/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';
import LoginStore from '../../stores/LoginStore';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';
var User1 = LoginStore.getUsername();


var intCount = 0;

const header={

};

const styles = {
  block: {
    maxWidth: 10,
  },
  toggle: {
    float: 'right',
    marginLeft:100,
  },
};

const liststyle={
  overflow: 'auto',
};

var post = {
   user1:User1,
 };

const MockChat = React.createClass({

  getInitialState: function () {
    return {
      chatitem:ThreadStore.getonlineuserslist(),
    };
  },

  componentDidMount: function () {
    ThreadStore.addChangeListener(this._onChange);
    ThreadActions.getonlineuserslist(post);
  },

  _onChange: function () {
    this.setState({
      chatitem:ThreadStore.getonlineuserslist(),
    });

  },

   togglechanged:function (e, value) {
    if (value) {
      console.log('togle unaaaa!');
      ThreadActions.setOfflineUsersList(post);

    }else{
    console.log('togle une naaa!');
    ThreadActions.setOnlineUsersList(post);
    }
  },


  _renderChatList: function () {
    return this.state.chatitem.map((chatitem) => {
      return (
        <div>
          <ListItem
            primaryText={chatitem.firstname}
            leftAvatar={<Avatar src={'img/profilepics/'+chatitem.username} />}
            rightIcon={<CommunicationChatBubble />} />
          <Divider />
        </div>
      );
    });
  },

  render: function () {
    return (
      <div>
      <div className='col-xs-10'/>
       <Toggle style={styles.toggle} onToggle={this.togglechanged} className='col-xs-2'/>
        <List subheader="Online users" subheaderStyle={this.header} style={this.liststyle}>
        <Divider/>
        <List>
          {this._renderChatList()}
        </List>
        </List>
      </div>
    );
  },
});

export default MockChat;
