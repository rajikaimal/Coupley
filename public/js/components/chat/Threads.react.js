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
    let token=localStorage.getItem('apitoken')
    let chat = {
      message: message,
      token:token
    }
<<<<<<< HEAD
    $.post('/sendmessage',chat ,function(res) {
      console.log('Sent ... response');
      console.log();
    });
=======
    console.log('Emiting ...');
    
    socket.emit('message', chat);
    console.log('Done ...');

>>>>>>> fe96c6a1edcdc7229e65212d5143fd2fb7f72b4a
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
