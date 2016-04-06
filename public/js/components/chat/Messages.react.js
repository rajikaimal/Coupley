import React from 'react';
import Paper from 'material-ui/lib/paper';
import ThreadStore from '../../stores/ThreadStore';
import LoginStore from '../../stores/LoginStore';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Emojis from './emojis';
var socket = io.connect('http://localhost:8081');
var User1 = LoginStore.getFirstname();
var User1Email = LoginStore.getEmail();

const styleup = {
  height:50,
  width: 650,
};

const style = {
  height: 435,
  width: 650,
  marginTop:0,
  overflow: 'auto',
};

const PaperExampleSimple = React.createClass({

  getInitialState: function () {
      return {
        threads: ThreadStore.getmessages(),
        resullts:'',
      }
    },

  userlistio:function () {
    socket.on('chatList', function (data) {
      console.log(data.Userlist + ' awa!');
    }.bind(this));
  },

  componentDidMount: function () {
    ThreadStore.addChangeListener(this._onChange);

  },

  _onChange: function () {
    this.setState({
      threads: ThreadStore.getmessages(),
    });

  },


  socketio: function () {
      socket.on('chat', function (data) {
        this.setState({ threads:data.message });
      }.bind(this));
    },

  test: function (item1) {
    var text1 = item1.message;
    var patt = /:\)/g;
    var patt1 = /:P/g;
    if (patt.test(text1)) {
      var texts = text1.split(/:\)/g);
      var content = [];
      for (var i = 0; i < texts.length - 1; i++) {
        content.push(texts[i]);
        content.push(<img src={Emojis[0].uri}/>);
      }

      return content.map(function (emoji) {
        return (<span> {emoji} </span>);
      }.bind(this));
    } else if (patt1.test(text1)) {
      var texts = text1.split(/:P/g);
      var content = [];
      for (var i = 0; i < texts.length - 1; i++) {
        content.push(texts[i]);
        content.push(<img src={Emojis[1].uri}/>);
      }

      return content.map(function (emoji) {
            return (<span> {emoji} </span>);
          }.bind(this));
    } else {
      return item1.message;
    }

  },





  render:function () {

    return (
      <div>
      {this.userlistio()}
      {this.socketio()}

      <Paper style={style} zDepth={1} id="data">
      <div>

      {

        this.state.threads.map((item) => {
       return (<ListItem
              leftAvatar={<Avatar src={'img/'+item.username} />}
              primaryText={item.firstname}
              secondaryText={this.test(item)}
              secondaryTextLines={2}
          />
      );
    })

      }

      </div>
      </Paper>
      </div>
    );

  },

});

export default PaperExampleSimple;
