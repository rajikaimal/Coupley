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

const commentSimple = React.createClass({

  EnterKey(e){
      if (e.key ==='Enter') {
              console.log();
              console.log(this.refs.commentBox.getValue());
              var comment = this.refs.commentBox.getValue();
              let save_comment={
                 Comment: status
              };
              ActivityFeedActions.save_comment(save_comment);
      }
   },

   render:function(){
       return (
         <div>
          <Paper zDepth={1}>
            <TextField hintText="Write a comment..." multiLine={false} fullWidth={true} onKeyPress={this.EnterKey} ref="commentBox"/>
          </Paper>
         </div>
       );
   }
});
  
export default commentSimple;
