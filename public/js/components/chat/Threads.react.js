import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const Threads = React.createClass({
  getInitialState: function() {
    return {
      threads: ''
    }
  },
  socketio: function() {
    var socket = io.connect('http://127.0.0.1:6379');
    socket.on('message', function (data) {
      console.log('DATA from threads');
      this.setState({threads: data});
    }.bind(this));
  },
  _sendmessage: function() {
    let message = this.refs.message.value;
    let chat = {
      message: message
    }
    $.post('/sendmessage',chat ,function(res) {
      console.log('Sent ... response');
    });
  },
  render: function() {
    return (
      <Card>
        {this.socketio()}
        <CardTitle title="Threads" subtitle="" />
        <CardText>
          Message threads
          {this.state.threads}
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
