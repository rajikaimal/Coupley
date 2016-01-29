import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import ActivityFeedActions from '../../actions/ActivityFeedActions';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleSimple = React.createClass({

  EnterKey(e){
      if (e.key ==='Enter') {
              console.log();
              console.log(this.refs.statusBox.getValue());
              var status = this.refs.statusBox.getValue();  
              let add_status={
                 Status: status
              };
              ActivityFeedActions.add_status(add_status);
      }
   },

   render:function(){
       return (
         <div>
          <Paper zDepth={1}>
            <TextField hintText="What's new with you? " multiLine={false} fullWidth={true} onKeyPress={this.EnterKey} ref="statusBox"/>
          </Paper>
         </div>
       );
   }
});
  
export default PaperExampleSimple;
