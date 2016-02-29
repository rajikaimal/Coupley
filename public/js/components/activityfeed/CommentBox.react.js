import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import CommentAction from '../../actions/ActivityFeed/CommentAction';
import LoginStore from '../../stores/LoginStore';
import ActivityList from './activityListComp.react';

const style = {
  width: 800,
  
};

const CommentBox = React.createClass({

  EnterKey(e){
      if (e.key ==='Enter') {
              console.log();
              console.log(this.refs.commentBox.getValue());
              var comment = this.refs.commentBox.getValue();
              var email= LoginStore.getEmail(); 
              var firstname = LoginStore.getFirstname();
              let add_comment={
                 PostId: postId,
                 Comment: comment,
                 Email: email,
                 Fname: firstname
              };
              CommentAction.add_comment(add_comment);
      }
   },

   render:function(){
       return (
         <div style={style}>
          <Paper>
            <TextField hintText="Write a comment..." multiLine={false} fullWidth={true} onKeyPress={this.EnterKey} ref="commentBox"/>
          </Paper>
         </div>
       );
   }
});
  
export default CommentBox;
