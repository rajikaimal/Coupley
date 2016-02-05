import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import LoginStore from '../../stores/LoginStore';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

var socket = io.connect('http://localhost:8081');
var User1 = LoginStore.getFirstname();




const Threads = React.createClass({
  getInitialState: function() {
    return {
      threads: []
    }
  },

  socketio: function() {
    socket.on('chat', function (data) {
      console.log(data.message);
      console.log(data.user2);
      this.setState({threads: data.message});
    }.bind(this));
  },
  _sendmessage: function() {
    let message = this.refs.message2.value;
    let User2 =this.refs.message1.value;
    let chat = {
      message: message,
      user1:User1,
      user2:User2
    }
    console.log('Emiting ...');

    socket.emit('message', chat);
    console.log('Done ...');

  },
  render: function() {
    return (
      <Card showsVerticalScrollIndicator={true}>
        {this.socketio()}
        <CardTitle title="Threads" subtitle="" />
        <CardText>
          Message threads
          <div >
          {

            this.state.threads.map(function(item) {
              //return (<li>{item.message}</li>);

              return(<ListItem
               leftAvatar={<Avatar src="profile pic" />}
               primaryText="Name"
               secondaryText={
              <p>
             {item.message}
             </p>
              }
               secondaryTextLines={2}
              />
                   );

            })
          }
          </div>
          <input type="text" ref="message1" />
          <input type="text" ref="message2" />
          <input type="button" onClick={this._sendmessage} value="Send message" />
        </CardText>
        <CardActions>
          <FlatButton label="Send message" />
        </CardActions>
      </Card>
    );
  }

});

export default Threads;
