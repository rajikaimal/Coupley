import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

var socket = io.connect('http://localhost:8081');

const Threads = React.createClass({
  getInitialState: function() {
    return {
      threads: []
    }
  },
  socketio: function() {
    socket.on('chat', function (data) {
      console.log(data.message);
      this.setState({threads: data.message});
    }.bind(this));
  },
  _sendmessage: function() {
    let message = this.refs.message.value;
    let chat = {
      message: message
    }
    console.log('Emiting ...');
    
    socket.emit('message', chat);
    console.log('Done ...');

  },
  render: function() {
    return (
      <Card>
        {this.socketio()}
        <CardTitle title="Threads" subtitle="" />
        <CardText>
          Message threads
          {
            this.state.threads.map(function(item) {
              return (<li>{item.message}</li>);
            })
          }
          <input type="text" ref="message" />
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