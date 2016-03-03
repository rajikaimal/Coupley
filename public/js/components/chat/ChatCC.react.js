import React from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import ThreadStore from '../../stores/ThreadStore';
import LoginStore from '../../stores/LoginStore';
import Emojis from './emojis';
var socket = io.connect('http://localhost:8081');
var User1 = LoginStore.getFirstname();
var User1Email = LoginStore.getEmail();

socket.emit('LoggedUser', User1);
socket.emit('LoggedUserEmail', User1Email);

const style = {
  height: 150,
  width: 650,
  paddingLeft:10,
  paddingRight:10,
  paddingTop:50,
  position:'relative',

};

const emptydiv = {
  height:-35,
  Color:'green',
};

function validateStatusText(textStatus) {

  if (textStatus.length > 250) {
    return {
            error: '*status is too long',
          };
  }  else if (textStatus === '') {
    return {
            error: '*status cannot be empty',
          };
  }  else {
    return true;
  }
};

const CC = React.createClass({

  getInitialState: function () {
    return {
      statusText: '',
    };
  },

  _sendmessage: function () {
    let val = true;
    let message = this.refs.message2.getValue();
    let User2 = localStorage.getItem('chatname');
    let Eml = LoginStore.getEmail();
    let chat = {
      message: message,
      user1: User1,
      user2: User2,
      emailusr1:Eml,
    };

    if (validateStatusText(message).error) {
      this.setState({
         statusText: validateStatusText(message).error,
       });
      val = false;
    } else {

      console.log('Emiting ...');
      socket.emit('message', chat);
      console.log('Done ...');

      this.setState({
         statusText: '',
       });

    }

    this.clearText();
  },

  clearText:function () {
    document.getElementById('MesageBox').value = '';
  },

  EnterKey(e) {
    if (e.key === 'Enter') {

      {this._sendmessage();}

    }
  },

  render:function () {
    return (
      <div>
                       <Paper style={style} zDepth={1}>
                       <div className='col=md-10' style={emptydiv}></div>
                       <TextField fullWidth={true} hintText="  Message" onKeyPress={this.EnterKey} ref="message2" errorText={this.state.statusText} id="MesageBox"/>
                       <FlatButton className='col-md-3' label="Add Files" />
                       <FlatButton className='col-md-3' label="Add Photos" />
                       <div className='col-md-4'>
                       </div><FlatButton className='col-md-1' label="Send"  rippleColor='#2196F3'/>
                       </Paper>
                 </div>
    );
  },

});

export default CC;
