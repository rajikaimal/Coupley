import React from 'react';
import Paper from 'material-ui/lib/paper';
import ChatCC from './ChatCC.react';
import MessageThread from './Messages.react';
import SelectFriend from './ChatTopBar.react';
import LoginStore from '../../stores/LoginStore';

var User1 = LoginStore.getFirstname();
var User1Email = LoginStore.getEmail();

const styleup = {
  height:50,
  width: 650,
  textAlign:'center',
};

const Paperstyle1 = {
  height:435,
  width: 650,
};

const Paperstyle2 = {
  height:535,
  width: 650,
  marginLeft:1,
  textAlign: 'center',
  display: 'inline-block',
};

const MainThread = React.createClass({
  render:function () {
    return (
      <Paper style={Paperstyle2}>
                  <Paper style={styleup} zDepth={2}><SelectFriend className='col-md-4'/><div className="col-md-8"/></Paper>
                  <MessageThread className="col-xs-6 col-md-4 col-lg-10" />
                  <ChatCC style={Paperstyle1} className="col-xs-6 col-md-8 col-lg-2" />
                  </Paper>
    );
  },
});

export default MainThread;
