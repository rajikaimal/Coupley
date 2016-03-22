import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const buttonStyle = {
  marginTop: 75,
  marginLeft: 420,
  paddingBottom: 150
};

const Photos = React.createClass({
  _startStream: function() {
    var socket = io.connect('localhost:8080');
    socket.on('mytweet',function(tweet){
      console.log(tweet.user.profile_image_url_https);
        $('#messages').append($('<li>').text((tweet)['text'])); 
    });
  },
  render: function() {
    return (
      <div>
        <div style={buttonStyle}>
          <RaisedButton label="Start streaming" primary={true} onClick={this._startStream}/>
        </div>

        <ul id="messages">
          
        </ul>
      </div>  
    );    
  }

});

export default Photos;