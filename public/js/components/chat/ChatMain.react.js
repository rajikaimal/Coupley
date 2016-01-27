import React from 'react';
import Messages from './Messages.react';
import Chatbox from './ChatBox.react';
import FloatButton from './FloatButton.react';
import List from 'material-ui/lib/lists/list';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';

const Mystylename={
     bottom:0,
     right:0
}



const ChatMain=React.createClass({

   EnterKey(e){
      if (e.key ==='Enter') {
              console.log('do validate');
          }
      },

   render:function(){
       return (
         <div>
         <div className='col-xs-3'>
          <Messages/>
         </div>
         <div className='col-xs-8'>
           <Chatbox/>
         <div><TextField hintText="Message" multiLine={true} fullWidth={true} onKeyPress={this.EnterKey}/></div>
         </div>
         <div style={Mystylename} className='col-xs-1'>
         <FloatButton/>
         </div>
         </div>
       );
   }
});


export default ChatMain;
