import React from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const style = {
  height: 100,
  width: 600,
};

const emptydiv={
   height:10
};


const CC= React.createClass({

  EnterKey(e){
     if (e.key ==='Enter') {
             console.log(this.refs.Chtbx.getValue());
             var Message = this.refs.Chtbx.getValue();
             let saveMessage={
                Message:Message
             };
             //ChatActions.saveMessage(saveMessage);
     }
  },

      render:function(){
         return(
           <div>
              <Paper style={style} zDepth={1}>
              <div className='col=md-10' style={emptydiv}></div>
              <TextField fullWidth={true} hintText="Message" onKeyPress={this.EnterKey} ref="Chtbx"/>
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
