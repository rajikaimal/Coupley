import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FavIcon from 'material-ui/lib/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
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
import ActivitySharedList from './activitySharedList.react';
import ActivityContainer from './activityContainer.react';
import CountBox from './CountBox.react';

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

const loadMoreStyle = {
  marginLeft: 100
}

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

var commentLimitNo = 0;
var reason;

const ActivityList = React.createClass({
  getInitialState: function () {
    return {
      opens: false,
      commentText: '',
      sharedResults: StatusStore.getSharedData(),
      commentResults: CommentStore.getCommentsData(),
      commentCount: CommentStore.getCommentCount(),
      count: LikeStatusStore.getCount(),
      liked: '',
      open1: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false,
      value: 2,
      likeCount: '',
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

    let LikedData = {
      postId: this.props.id,
    };
    ActivityfeedAction.getCount(LikedData);

    let CommentedData = {
      postId: this.props.id,
    };
    ActivityfeedAction.getCommentCount(CommentedData);
  },

  _onChange: function () {
    this.setState({sharedResults: StatusStore.getSharedData()});  
    this.setState({commentResults: CommentStore.getCommentsData()});
    this.setState({commentCount: CommentStore.getCommentCount()});
    this.setState({count: LikeStatusStore.getCount()});
  },


  _getSharedItem: function () { 
    if(this.props.type=="shared"){
      return(<ActivitySharedList sid={this.props.sid}
                                 sfirstname={this.props.sfirstname}
                                 susername={this.props.susername}
                                 sattachment={this.props.sattachment}
                                 spost_text={this.props.spost_text}
                                 screated_at={this.props.screated_at}/>)
    }
  },

  _getLikedCount: function () {
    let self = this;
    return (this.state.count.map(function(val) {
      return (val.map(function(result) {
        if(self.props.id == result.post_id) {
           return(<CountBox likedCount={result.likedCount}
                            shareCount={result.shareCount}
                            post_id={result.post_id}/>);
        }
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
                             cusername={comm.username}
                             comment_txt={comm.comment_txt} />);       
          }
        }));
      }));
  },

  _getCommentCount: function () {
    let self = this;
      return (this.state.commentCount.map(function(comment) {
        return (comment.map(function(comm) {
          if(self.props.id == comm.post_id) {
            return (<CountBox ckey={comm.post_id} 
                              cCount={comm.commCount} />);       
          }
        }));
      }));
  },

  _editStatus: function () {
    let status = this.refs.EditBox.getValue();
    let editData = {
      userId: localStorage.getItem('userid'),
      postId: this.props.id,
      status: status,
    };
    ActivityfeedAction._editStatus(editData);
    this.handleClose();
  },

  _deleteStatus: function () {
    let deleteData = {
      userId: localStorage.getItem('userid'),
      postId: this.props.id,
    };
    ActivityfeedAction._deleteStatus(deleteData);
    },

  _blockedStatus: function () {
    let blockData = {
      email: LoginStore.getEmail(),
      userId: localStorage.getItem('userid'),
      postId: this.props.id,
    };
    ActivityfeedAction._blockStatus(blockData);
  },

  _reportStatus: function () {

    if (this.state.value==1){
      reason = "It's annoying";
    } else if (this.state.value==2) {
      reason = "It's not interesting";
    } else if (this.state.value==3) {
      reason = "It's Spam";
    } else if (this.state.value==4) {
      reason = "I think it shouldn't be on Coupley";
    } 

    var reportComment = this.refs.ReportBox.getValue();
    let reportData = {
      postId: this.props.id,
      comment: reportComment,
      reason: reason,
    };
    ActivityfeedAction.reportStatus(reportData);
    this._blockedStatus();
    this.setState({open6: false});
    this.setState({open7: true});
  },

  _changeShareState:function() {
    let shareStatus = this.refs.shareBox.getValue();
    let shareData = {
      email: LoginStore.getEmail(),
      userId: localStorage.getItem('userid'), 
      userName: localStorage.getItem('username'),
      firstName: LoginStore.getFirstname(),
      postId: this.props.id,
      status: shareStatus,
    };

      this.setState({shared: !this.state.shared});
      ActivityfeedAction._addShare(shareData);
      //alert('Share successful');
   
    this.setState({open1: false});   
    this.setState({open4: true});
  },

  _changeLikeState: function () {
    let likeData = {
      postId: this.props.id,
      userId: localStorage.getItem('userid'), 
      email: LoginStore.getEmail(),
      firstName: LoginStore.getFirstname(),
      userName: localStorage.getItem('username'),
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

  handleOpenDelete: function () {
    this.setState({open3: true});
  },

  handleOpenBlock: function () {
    this.setState({open5: true});
  },

  handleOpenReport: function () {
    this.setState({open6: true});
  },

  reportHandleChange: function (event, index, value) {
    this.setState({value: value});
  },

  handleClose: function () {
    this.setState({opens: false});
    this.setState({open3: false});
    this.setState({open4: false});
    this.setState({open5: false});
    this.setState({open6: false});
    this.setState({open7: false});
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
        userId: localStorage.getItem('userid'),  
        comment: comment,
        email: LoginStore.getEmail(),
        firstName: LoginStore.getFirstname(),
        userName: localStorage.getItem('username'),
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

    const confirmDeleteActions = [
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._deleteStatus}/>,

      <FlatButton
        label="Cansel"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

    const confirmBlockActions = [
      <FlatButton
        label="Block"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._blockedStatus}/>,

      <FlatButton
        label="Cansel"
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

    const confirmShareActions = [
      <FlatButton
        label="Ok"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

    const ReportActions = [
      <FlatButton
        label="Report"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._reportStatus}/>,

      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

    const confirmReportActions = [
      <FlatButton
        label="Ok"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

    return (
      <div style={style1}>
        <div>
          <Card>
            <ListItem
              leftAvatar={<Avatar src={'img/profilepics/'+ this.props.username} />}
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
                    <MenuItem primaryText="Remove" onClick={this.handleOpenDelete}/>
                    <MenuItem primaryText="Unfollow" onClick={this.handleOpenBlock}/>
                    <MenuItem primaryText="Report" onClick={this.handleOpenReport}/>
                  </IconMenu> } />

              <CardText>
                {this.props.postText}
              </CardText>

              <div>
                {
                  (this.props.attachment!='None') ? <div>
                                                  <CardMedia>
                                                    <img src={'img/activityFeedPics/'+ this.props.attachment} />
                                                  </CardMedia>
                                            </div> : ''
                }
              </div>


              <div>
                {this._getSharedItem()}
              </div>
                  
              <IconButton onClick={this._changeLikeState} tooltip={!this.state.liked ? "Unlike" : "Like"} touch={true} tooltipPosition="bottom-right">
                {!this.state.liked ? <FavIcon onClick={this._changeLikeState} viewBox="0 0 20 30" color={Colors.red500} /> : 
                  <FavIconBorder viewBox="0 0 20 30" color={Colors.red500} />}
              </IconButton>

              <FlatButton label="Comment" onClick={this.setFocusToTextBox} />
              <FlatButton label="Share" onClick={this.handleOpenShare} /> /> 

          </Card> 

          <div>
            {this._getLikedCount()}
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
            title="Delete Post"
            actions={confirmDeleteActions}
            modal={false}
            open={this.state.open3}
            onRequestClose={this.handleClose}>
              Are you sure you want to delete this post? 
          </Dialog>

          <Dialog
            title="Block Post"
            actions={confirmBlockActions}
            modal={false}
            open={this.state.open5}
            onRequestClose={this.handleClose}>
              Are you sure you want to block this post? 
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
            title="Share Post"
            actions={confirmShareActions}
            modal={false}
            open={this.state.open4}
            onRequestClose={this.handleClose}>
              This has been shared to your Timeline.
          </Dialog>

          <Dialog
            title="Report Status"
            actions={ReportActions}
            modal={false}
            open={this.state.open6}
            onRequestClose={this.handleClose}>
              <label>Reason</label>
                <DropDownMenu value={this.state.value} onChange={this.reportHandleChange}>
                  <MenuItem value={1} primaryText="It's annoying"/>
                  <MenuItem value={2} primaryText="It's not interesting"/>
                  <MenuItem value={3} primaryText="It's Spam"/>
                  <MenuItem value={4} primaryText="I think it shouldn't be on Coupley"/>
                </DropDownMenu>
            <TextField hintText="Comment" multiLine={false} fullWidth={true} ref="ReportBox" />
          </Dialog>

          <Dialog
            title="Report Status"
            actions={confirmReportActions}
            modal={false}
            open={this.state.open7}
            onRequestClose={this.handleClose}>
              You have reported this post 
          </Dialog>

        </div>

        <div>
          {this._getCommentCount()}
          {this._getCommentList()}
        </div>
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