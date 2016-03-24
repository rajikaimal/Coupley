import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
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
import CommentStore from '../../stores/CommentStore';
import Comment from './Comment.react';
import LikeStatusStore from '../../stores/LikeStatusStore';
import ActivitySharedList from './ActivitySharedList.react';
import ActivityContainer from './activityContainer.react';

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

const style3 = {
  width: 760,
  position:'relative',

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

var lFirstName;
  
const ActivityList = React.createClass({
  getInitialState: function () {
    return {
      opens: false,
      commentText: '',
      sharedResults: StatusStore.getSharedData(),
      likedUsers: LikeStatusStore.getLikedUsers(),
      commentResults: CommentStore.getCommentsData(),
      liked: '',
      open: false,
      open1: false,
    };
  },

  componentDidMount: function () {
    StatusStore.addChangeListener(this._onChange);
    LikeStatusStore.addChangeListener(this._onChange);
    CommentStore.addChangeListener(this._onChange);

    if(!this.props.lPostId){
      this.setState({liked: !this.state.liked});
    } else {
      this.setState({liked: this.state.liked});
    }

    let commentData = {
      postId: this.props.id,
    };
    ActivityfeedAction.getCommentList(commentData);

    let likeData = {
      postId: this.props.id,
    };
    ActivityfeedAction.getLikedUsers(likeData);
  },

  _onChange: function () {
    this.setState({sharedResults: StatusStore.getSharedData()});
    this.setState({likedUsers: LikeStatusStore.getLikedUsers()});
    this.setState({commentResults: CommentStore.getCommentsData()});
  },

  _getSharedItem: function () { 
    if(this.props.type=="shared"){
      return(<ActivitySharedList sid={this.props.sid}
                                 sfirstname={this.props.sfirstname}
                                 sattachment={this.props.sattachment}
                                 spost_text={this.props.spost_text}
                                 screated_at={this.props.screated_at}/>)
    }
  },

  _getLikedUsers: function () {
    this.setState({open: true});
    let self = this;
    return (this.state.likedUsers.map(function(likeUsers) {
      return (likeUsers.map(function(results) {
        console.log(results);
        return(lFirstName=results.firstname);
      }));
    }));
  },

  _getCommentList: function () {
      let self = this;
      return (this.state.commentResults.map(function(comment) {
        return (comment.map(function(comm) {
          if(self.props.id == comm.post_id) {
            return (<Comment ckey={comm.id} 
                             cid={comm.id} 
                             cfirstName={comm.firstname} 
                             comment_txt={comm.comment_txt} />);       
          }
        }));
      }));
  },

  _editStatus: function () {
    let status = this.refs.EditBox.getValue();
    let editData = {
      userId: 11,
      postId: this.props.id,
      status: status,
    };
    ActivityfeedAction._editStatus(editData);
    this.handleClose();
  },

  _deleteStatus: function () {
    let deleteData = {
      userId: 11,
      postId: this.props.id,
    };
    ActivityfeedAction._deleteStatus(deleteData);
    },

  _changeShareState:function() {
    let shareStatus = this.refs.shareBox.getValue();
    let shareData = {
      email: LoginStore.getEmail(),
      userId: 11,  
      firstName: LoginStore.getFirstname(),
      postId: this.props.id,
      status: shareStatus,
    };

    if (!this.state.shared) {shareStatus
      this.setState({shared: !this.state.shared});
      ActivityfeedAction._addShare(shareData);
      alert('Share successful');
    }
    this.handleClose();
  },

  _changeLikeState: function () {
    let likeData = {
      postId: this.props.id,
      userId: 11, 
      email: LoginStore.getEmail(),
      firstName: LoginStore.getFirstname(),
    };

    if (this.state.liked) {
      this.setState({liked: !this.state.liked});
      ActivityfeedAction.like(likeData);
    }
    else {
      this.setState({liked: !this.state.liked});
      ActivityfeedAction.unlike(likeData);
    }
  },

  handleOpen: function () {
    this.setState({opens: true});
  },

  handleOpenShare: function () {
    this.setState({open1: true});
  },

  handleClose: function () {
    this.setState({opens: false});
    this.setState({open: false});
    this.setState({open1: false});
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
        userId: 11,  
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
        ActivityfeedAction.addComment(commentData);
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
    const updateActions = [
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

    const likeActions = [
      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

    const shareActions = [
      <FlatButton
        label="Post"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._changeShareState}/>,

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
                  <b>{this.props.created_at}</b>
                </p>
              }
              secondaryTextLines={1} 
              rightIconButton={
                  <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem primaryText="Edit" onClick={this.handleOpen}/>
                    <MenuItem primaryText="Remove" onClick={this._deleteStatus}/>
                    <MenuItem primaryText="Block" />
                  </IconMenu> } />

              <CardText>
                {this.props.postText}
              </CardText>

              <CardMedia expandable={true}>
                <img src={this.props.attachment} />
              </CardMedia>

              <div>
                {this._getSharedItem()}
              </div>
                  
              <IconButton onClick={this._changeLikeState} tooltip={!this.state.liked ? "Unlike" : "Like"} touch={true} tooltipPosition="bottom-right">
                {!this.state.liked ? <FavIcon onClick={this._changeLikeState} viewBox="0 0 20 30" color={Colors.red500} /> : 
                  <FavIconBorder viewBox="0 0 20 30" color={Colors.red500} />}
              </IconButton>

              <FlatButton label="Comment" onClick={this.setFocusToTextBox} />
              <FlatButton label="Share" onClick={this.handleOpenShare}  secondary={this.state.shared ? true : false}/>
              <Divider inset={true} />   
             
          </Card> 

          <div>
            <Card style={style2}>
              <Paper zDepth={1}>
                <FlatButton label={!this.props.likesCount ? " " : this.props.likesCount + " Likes"} onClick={this._getLikedUsers}/>
                <FlatButton label="2 Shares"  />
              </Paper>
            </Card>
          </div>

          <Dialog
            title="Modify Your Status"
            actions={updateActions}
            modal={false}
            open={this.state.opens}
            onRequestClose={this.handleClose}>
            <TextField hintText="Update your status" multiLine={false} fullWidth={true} ref="EditBox" defaultValue={this.props.postText}/>
          </Dialog>

          <Dialog
            title={this.props.firstName + "'s post Share on your own Activityfeed"}
            actions={shareActions}
            modal={false}
            open={this.state.open1}
            onRequestClose={this.handleClose}>
            <TextField hintText="Say something about this..." multiLine={false} fullWidth={true} ref="shareBox" />
          </Dialog>

          <Dialog
            title="Liked Users"
            actions={likeActions}
            modal={true}
            open={this.state.open}>
               
              <ListItem 
                id="likedListBox"
                leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
                primaryText={lFirstName} />
              <Divider inset={true} />
          </Dialog>

        </div>

        <div>{this._getCommentList()}</div>
        <div>
          <Card style={style2}>
            <Paper zDepth={1}>
              <div className='col-md-10'></div>
                <TextField style={style3} className='col-md-2' fullWidth={true} hintText="Write a comment..." multiLine={false} onKeyPress={this.EnterKey} errorText={this.state.commentText} ref="commentBox" id={this.props.id} />
            </Paper>
          </Card>
        </div>
      </div>
    );
  }
});

export default ActivityList;

