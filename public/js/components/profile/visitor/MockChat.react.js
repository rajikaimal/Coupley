import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';

const ChatData = [{
  "name": "Rajika Imal",
  "uri": "http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png"
},{
  "name": "Stephanie Hwang",
  "uri": "http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png"
},{
  "name": "Anne Hathway",
  "uri": "http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png"
}]

const ChatData_2 = [{
  "name": "Rajika Imal",
  "uri": "http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png"
},{
  "name": "Stephanie Hwang",
  "uri": "http://images6.fanpop.com/image/photos/35600000/Tiffany-SNSD-IPKN-tiffany-hwang-35651024-720-720.png"
}]

const MockChat = React.createClass({
  _renderPrevList: function() {
    return ChatData_2.map((chatitem) => {
      return (
        <div>
          <ListItem
            primaryText={chatitem.name}
            leftAvatar={<Avatar src={chatitem.uri} />}
            rightIcon={<CommunicationChatBubble />} />
          <Divider />
        </div>
      );
    });
  },
  _renderChatList: function() {
    return ChatData.map((chatitem) => {
      return (
        <div>
          <ListItem
            primaryText={chatitem.name}
            leftAvatar={<Avatar src={chatitem.uri} />}
            rightIcon={<CommunicationChatBubble />} />
          <Divider />
        </div>
      );
    });
  },
  render: function() {
    return (
      <div>
        <List subheader="Recent chats">
          {this._renderChatList()}
        </List>
        <List subheader="Previous chats">
          {this._renderPrevList()}
        </List>
      </div> 
    );  
  }
});

export default MockChat;