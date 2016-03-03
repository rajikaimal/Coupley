// import React from 'react';
// import TextField from 'material-ui/lib/text-field';
// import Paper from 'material-ui/lib/paper';
// import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
// import CommentAction from '../../actions/ActivityFeed/CommentAction';
// import LoginStore from '../../stores/LoginStore';
// import ActivityList from './activityListComp.react';

// const style = {
//   width: 800,
  
// };

// const CommentBox = React.createClass({

//       validateCommentTxt:function(txtComment) {

//         if(txtComment.length < 200) {
//           return {
//             "error": "*comment is too long"
//           }
//         }
//         else if(status_txt === "") {
//           return {
//             "error": "*comment cannot be empty"
//           }
//         }
//         else {
//           return true;
//         }
//     },

//     getInitialState: function () {
//         return {
//             commentTxt: ''
//         }
//     },

//   EnterKey(e){
//       if (e.key ==='Enter') {
//               let val = true;
//               console.log(this.refs.commentBox.getValue());
//               var comment = this.refs.commentBox.getValue();
//               var email= LoginStore.getEmail(); 
//               var firstname = LoginStore.getFirstname();
//               let add_comment={
//                  PostId: postId,
//                  Comment: comment,
//                  Email: email,
//                  Fname: firstname
//               };
//               CommentAction.add_comment(add_comment);
              
//       if(validateCommentTxt(comment).error) {
//         this.setState({
//           commentTxt: validateCommentTxt(comment).error
//         });
//         val = false;
//       }

//       this.clear();
//       }
//    },

//     clear:function() {
//         document.getElementById('comTxt').value = "";
//     },

//    render:function(){
//        return (
//          <div style={style}>
//           <Paper>
//             <TextField hintText="Write a comment..." multiLine={false} fullWidth={true} onKeyPress={this.EnterKey} errorText={this.state.commentTxt} ref="commentBox" id="comTxt"/>
//           </Paper>
//          </div>
//        );
//    }
// });
  
// export default CommentBox;
