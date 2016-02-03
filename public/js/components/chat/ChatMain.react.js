import React from 'react';
import Messages from './Messages.react';
import Chatbox from './ChatBox.react';
import ChatCard from './chatCard.react';
import FloatButton from './FloatButton.react';
import List from 'material-ui/lib/lists/list';
import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import ChatActions from '../../actions/ChatAction';


const Mystyle={
     bottom:0,
     right:0
}

const style={
    margin:500

}


const ChatMain=React.createClass({

   EnterKey(e){
      if (e.key ==='Enter') {
              console.log();
              console.log(this.refs.Chtbx.getValue());
              var Message = this.refs.Chtbx.getValue();
              let saveMessage={
                 Message:Message
              };
              ChatActions.saveMessage(saveMessage);
      }
   },

   render:function(){
       return (
         <div>
         <div className='col-xs-3'>
          <Messages/>
         </div>
         <div className='col-xs-8' >
           <div >
           <Chatbox/>
           <ChatCard/>
           </div>
       </div>
         <div style={Mystyle} className='col-xs-1'>
         <div className='col-sm-10'></div><div className='col-sm-2'></div><div className='col-sm-6'></div>
         <FloatButton/>
         </div>
         </div>
       );
   }
});


export default ChatMain;
