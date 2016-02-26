import React from 'react';
import Paper from 'material-ui/lib/paper';
import ChatCC from './ChatCC.react'


const Paperstyle1 = {
  height:535,
  width: 650,
};

const Paperstyle2 = {
  height:635,
  width: 650,
  marginLeft:5,
  textAlign: 'center',
  display: 'inline-block',
};


 const MainThread=React.createClass({
       render:function(){
          return(
            <div>
            <Paper style={Paperstyle2} zDepth={2}>
            <ChatCC/>
            </Paper>
            </div>
          )
       }
 });

export default MainThread;
