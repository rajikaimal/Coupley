import React from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import ThreadStore from '../../stores/ThreadStore';
import LoginStore from '../../stores/LoginStore';
import Emojis from './emojis';
var socket = io.connect('http://localhost:8081');
var User1 = LoginStore.getFirstname();
var User1Email=LoginStore.getEmail();

socket.emit('LoggedUser',User1);
socket.emit('LoggedUserEmail',User1Email);

const style = {
  height: 150,
  width: 650,
  paddingLeft:10,
  paddingRight:10,
  position:'relative',

};

const emptydiv={
   height:10
};


const CC= React.createClass({


    _sendmessage: function() {
        let message = this.refs.message2.getValue();
        let User2 = localStorage.getItem('chatname');
        let Eml = LoginStore.getEmail();
      let chat = {
          message: message,
          user1: User1,
          user2: User2,
          emailusr1:Eml
      }

      console.log('Emiting ...');
      socket.emit('message', chat);
      console.log('Done ...');

    },

  EnterKey(e){
     if (e.key ==='Enter') {

            {this._sendmessage()}
     }
  },


      render:function(){
         return(
           <div>
              <Paper style={style} zDepth={1}>
              <div className='col=md-10' style={emptydiv}></div>
              <TextField  hintText="user" ref="message1"/>
              <TextField fullWidth={true} hintText="  Message" onKeyPress={this.EnterKey} ref="message2"/>
              <FlatButton className='col-md-3' label="Add Files" />
              <FlatButton className='col-md-3' label="Add Photos" />
              <div className='col-md-4'>
              </div><FlatButton className='col-md-1' label="Send"  rippleColor='#2196F3'/>
              </Paper>
           </div>
         )
      }

});


export default CC;
