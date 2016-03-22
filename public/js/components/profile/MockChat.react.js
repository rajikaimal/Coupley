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

// const ChatData = [{
//   name: 'Tharaka',
//   uri: 'http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png',
// }, {
//   name: 'Stephanie Hwang',
//   uri: 'http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png',
// }, {
//   name: 'Test',
//   uri: 'http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png',
// }, ];
//
// const ChatData_2 = [{
//   name: 'Rajika Imal',
//   uri: 'http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png',
// }, {
//   name: 'Stephanie Hwang',
//   uri: 'http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png',
// }, ];

const header={
  
};

const styles = {
  block: {
    maxWidth: 10,
  },
  toggle: {
    marginBottom: 2,
    float: 'right',
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
    console.log(post.user1);
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
    }
  },

  // _renderPrevList: function () {
  //   return this.state.chatitem.map((chatitem) => {
  //     return (
  //       <div>
  //         <ListItem
  //           primaryText={chatitem.firstname}
  //           leftAvatar={<Avatar src={chatitem.uri} />}
  //           rightIcon={<CommunicationChatBubble />} />
  //         <Divider />
  //       </div>
  //     );
  //   });
  // },

  _renderChatList: function () {
    return this.state.chatitem.map((chatitem) => {
      return (
        <div>
          <ListItem
            primaryText={chatitem.firstname}
            leftAvatar={<Avatar src={chatitem.uri} />}
            rightIcon={<CommunicationChatBubble />} />
          <Divider />
        </div>
      );
    });
  },

  render: function () {
    return (
      <div>
        <List subheader="Online users" subheaderStyle={this.header} style={this.liststyle}>
        <Toggle  style={styles.toggle} onToggle={this.togglechanged}/>
          {this._renderChatList()}
        </List>
      </div>
    );
  },
});

export default MockChat;
