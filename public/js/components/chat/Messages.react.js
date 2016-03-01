import React from 'react';
import Paper from 'material-ui/lib/paper';
import ThreadStore from '../../stores/ThreadStore';
import LoginStore from '../../stores/LoginStore';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Emojis from './emojis';
var socket = io.connect('http://localhost:8081');
var User1 = LoginStore.getFirstname();
var User1Email=LoginStore.getEmail();

const styleup={
   height:50,
   width: 650,
};

const style = {
  height: 435,
  width: 650,
  marginTop:0,
  overflow: 'auto'
};

const PaperExampleSimple =React.createClass({


    getInitialState: function() {
      return {
          threads: ThreadStore.getmessages()
      }
    },

    userlistio:function(){
      socket.on('chatList',function(data){
          console.log(data.Userlist+" awa!");
      }.bind(this));
   },

      componentDidMount: function () {
          ThreadStore.addChangeListener(this._onChange);

      },
      _onChange: function () {
          this.setState({
              threads: ThreadStore.getmessages()
          });

      },
    socketio: function() {
      socket.on('chat', function (data) {
        this.setState({threads:data.message});
      }.bind(this));
    },
    test: function(item1) {
    	var texts = item1.message.split(/:\)/g);
      var content = [];
      for(var i = 0; i < texts.length - 1; i++) {
      	content.push(texts[i]);
        content.push(<img src={Emojis[0].uri}/>);
      }
      return content.map(function(emoji) {
        return (<span> {emoji} </span>)
      }.bind(this));
    },


  render:function(){

    return(
      <div>
      {this.userlistio()}
      {this.socketio()}

      <Paper style={style} zDepth={1}>
      <div>
    {

      this.state.threads.map(item => {

          return (<ListItem
              leftAvatar={<Avatar src="profile pic" />}
              primaryText={item.user1}
              secondaryText={item.message}
              secondaryTextLines={2}
          />
          );

      })
    }
      </div>
      </Paper>
      </div>
    )

  }


});

export default PaperExampleSimple;
