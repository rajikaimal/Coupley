import React from 'react';
import Card from 'material-ui/lib/card/card';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import FavIcon from 'material-ui/lib/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import LoginStore from '../../stores/LoginStore';
import StatusStore from '../../stores/StatusStore';
import ActivityfeedAction from '../../actions/ActivityFeed/ActivityfeedAction';
import CommentAction from '../../actions/ActivityFeed/CommentAction';
import CommentStore from '../../stores/CommentStore';
import CommentList from './CommentList.react';
import LikesActions from '../../actions/ActivityFeed/LikesActions';
import LikeStatusStore from '../../stores/LikeStatusStore';
import ShareActions from '../../actions/ActivityFeed/ShareActions';
import ShareStatusStore from '../../stores/ShareStatusStore';

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

function validateCommentText(textComment) {
  if(textComment.length > 200) {
    return {
      "error": "*comment is too long"
    }
  }
  else if(textComment === "") {
    return {
      "error": "*comment cannot be empty"
    }
  }
  else {
    return true;
  }
};

const ActivityList = React.createClass({
  getInitialState: function () {
    return {
      opens: false,
      commentText: '',
    };
  },

  componentDidMount: function () {
    let data = {
      postId: this.props.id,
      email: LoginStore.getEmail(),
    };
            
    LikeStatusStore.addChangeListener(this._onChange);    
    LikesActions._getLikeStatus(data);

    ShareStatusStore.addChangeListener(this._onChange);
    ShareActions._getShareStatus(data);
  },

  _onChange: function () {
    this.setState({liked: LikeStatusStore.getLikes()});
    this.setState({shared: ShareStatusStore.getShares()});

    if (LikeStatusStore.getLikes() == "false") {
      this.setState({
        liked: false,
      });
    }
    if (LikeStatusStore.getLikes() == "true") {
      this.setState({
        liked: true,
      });
    }
    if (ShareStatusStore.getShares() == "false") {
      this.setState({
        shared: false,
      });
    }
    if (ShareStatusStore.getShares() == "true") {
      this.setState({
        shared: true,
      });
    }
  },

  _editStatus: function () {
    let status = this.refs.EditBox.getValue();
    let editData = {
      postId: this.props.id,
      status: status,
    };
    ActivityfeedAction._editStatus(editData);
    this.handleClose();
    },

  _deleteStatus: function () {
    let deleteData = {
      postId: this.props.id,
    };
    ActivityfeedAction._deleteStatus(deleteData);
    },

  _changeShareState:function() {
    let shareData = {
      postId: this.props.id,
      email: LoginStore.getEmail(),
      firstName: LoginStore.getFirstname(),
    };

    if (!this.state.shared) {
      this.setState({shared: !this.state.shared});
      ShareActions._addShare(shareData);
      alert('Share successful');
    }
    else {
      this.setState({shared: !this.state.shared});
      ShareActions._deleteShare(shareData);
       alert('Unshare successful');
    }
  },

  _changeLikeState: function () {
    let likeData = {
      postId: this.props.id,
      email: LoginStore.getEmail(),
      firstName: LoginStore.getFirstname(),
    };

    if (!this.state.liked) {
      this.setState({liked: !this.state.liked});
      LikesActions.like(likeData);
    }
    else {
      this.setState({liked: !this.state.liked});
      LikesActions.unlike(likeData);
    }
  },

  handleOpen: function () {
    this.setState({opens: true});
  },

  handleClose: function () {
    this.setState({opens: false});
  },

  setFocusToTextBox: function () {
    document.getElementById(this.props.id).focus();
  },

  EnterKey(e){
    if (e.key ==='Enter') {
      let val = true;
      var comment = this.refs.commentBox.getValue();
      let commentData={
        postId: this.props.id,
        comment: comment,
        email: LoginStore.getEmail(),
        firstName: LoginStore.getFirstname(),
      };
             
      if(validateCommentText(comment).error) {
        this.setState({
          commentText: validateCommentText(comment).error
        });
        val = false;
      }
      else {
        CommentAction.addComment(commentData);
        this.setState({
          commentText: ''
        });
      }
      this.clearText();
    }
  },

  clearText:function() {
    var commentBoxId=this.props.id;
    document.getElementById(commentBoxId).value = "";
  },

	render: function() {
    const actions = [
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._editStatus}/>,

      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

		return (
			<div style={style1}>
			  <div>
          <Card>
		        <ListItem
		          leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
		          primaryText={this.props.firstName}
		          secondaryText={
		            <p>
		              <b>{this.props.created_at}</b><br/>
              			{this.props.postText}
		            </p>
		          }
		          secondaryTextLines={2} 
		          rightIconButton={
                  <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem primaryText="Edit" onClick={this.handleOpen}/>
                    <MenuItem primaryText="Remove" onClick={this._deleteStatus}/>
                    <MenuItem primaryText="Block" />
                  </IconMenu> } />
                  <IconButton onClick={this._changeLikeState} tooltip={this.state.liked ? "Unlike" : "Like"} touch={true} tooltipPosition="bottom-right">
                    {this.state.liked ? <FavIcon onClick={this._changeLikeState} viewBox="0 0 20 30" color={Colors.red500} /> : 
                            <FavIconBorder viewBox="0 0 20 30" color={Colors.red500} />}
                  </IconButton>
               
          			<FlatButton label="Comment" onClick={this.setFocusToTextBox} />
          			<FlatButton label="Share" onClick={this._changeShareState}  secondary={this.state.shared ? true : false}/>
		          <Divider inset={true} />	   
          </Card>	
            <Dialog
              title="Modify Your Status"
              actions={actions}
              modal={false}
              open={this.state.opens}
              onRequestClose={this.handleClose}>
              <TextField hintText="Update your status" multiLine={false} fullWidth={true} ref="EditBox" defaultValue={this.props.postText}/>
            </Dialog>
			  </div>
          <div><CommentList /></div>
			  <div style={style2}>
          <Paper>
            <TextField hintText="Write a comment..." multiLine={false} fullWidth={true} onKeyPress={this.EnterKey} errorText={this.state.commentText} ref="commentBox" id={this.props.id}/>
          </Paper>
        </div>
			</div>
		);
	}
});

export default ActivityList;
