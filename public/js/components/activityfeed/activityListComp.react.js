import React from 'react';
import Card from 'material-ui/lib/card/card';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import LikesActions from '../../actions/ActivityFeed/LikesActions';
import ShareActions from '../../actions/ActivityFeed/ShareActions';
import LoginStore from '../../stores/LoginStore';
import StatusStore from '../../stores/StatusStore';
import ActivityFeedActions from '../../actions/ActivityFeed/ActivityFeedActions';
import CommentAction from '../../actions/ActivityFeed/CommentAction';
import CommentStore from '../../stores/CommentStore';
import CommentList from '../comments/CommentList.react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <MoreVertIcon color={Colors.deepPurple500} />
  </IconButton>
);

const style1 = {
  width: 800,
  margin: 40,
};

const style2 = {
  width: 800,
};

var a=1;

const ActivityList = React.createClass({


     editStatus:function(){
        var postId= this.props.id;
        var post_text= this.props.post_text;
     },

     deleteStatus:function(){
        var postId= this.props.id;
        let delete_status={
          PostId: postId
        };
        ActivityFeedActions.delete_status(delete_status);
     },

	   addlike:function(){
       a=a+1;
       console.log(a%2!=0);
        var postId= this.props.id;
        console.log(postId);
        var email= LoginStore.getEmail(); 
        var firstname = LoginStore.getFirstname();
        let add_likes={
            PostId: postId,
            Email: email,
            Fname: firstname
        };
        LikesActions.add_likes(add_likes);
	   },

  	addshare:function(){
        var postId= this.props.id;
        var email= LoginStore.getEmail(); 
        var firstname = LoginStore.getFirstname();
        let add_share={
            PostId: postId,
            Email: email,
            Fname: firstname
        };
        ShareActions.add_share(add_share);
  	},

    setFocusToTextBox:function(){
        document.getElementById("mytext").focus();
    },

    getInitialState: function() {
        return {
            open: false,
        };
    },
 
    handleOpen:function(){
      this.setState({open: true});
    },

    handleClose:function(){
     this.setState({open: false});
    },

    getId:function(){
      return {
        pid: this.props.id,
      };
    },

    EnterKey_comment(e){
      if (e.key ==='Enter') {
              console.log();
              console.log(this.refs.commentBox.getValue());
              var postId= this.props.id;
              var comment = this.refs.commentBox.getValue();
              var email= LoginStore.getEmail(); 
              var firstname = LoginStore.getFirstname();
              let add_comment={
                 PId: postId,
                 Comment: comment,
                 Email: email,
                 Fname: firstname
              };
              CommentAction.add_comment(add_comment);
      }
    },

	  render: function() {
     const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}/>,
    ];

		return (
			<div style={style1}>
			<div >
      <Card>
		        <ListItem
		          leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
		          primaryText={this.props.firstname}
		          secondaryText={
		            <p>
		              <b>{this.props.created_at}</b><br/>
              			{this.props.post_text}
		            </p>
		          }
		          secondaryTextLines={2} 
		          rightIconButton={
                 <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem primaryText="Edit" onClick={this.handleOpen}/>
                    <MenuItem primaryText="Remove" onClick={this.deleteStatus}/>
                    <MenuItem primaryText="Block" />
                  </IconMenu> } />
		           	<FlatButton label="Like" onClick={this.addlike} primary={a%2!=0?false:true} />
          			<FlatButton label="Comment" onClick={this.setFocusToTextBox} />
          			<FlatButton label="Share" onClick={this.addshare}/>
		        <Divider inset={true} />	   
      </Card>	
      <Dialog
          title="Edit Status"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <TextField hintText="Modify your status..." multiLine={false} fullWidth={true} />
      </Dialog>	
			</div>
        <div><CommentList /></div>
				<div style={style2}>
          <Paper>
            <TextField hintText="Write a comment..." multiLine={false} fullWidth={true} onKeyPress={this.EnterKey_comment} ref="commentBox" id="mytext"/>
          </Paper>
        </div>
			</div>
		);
	}
});

export default ActivityList;

