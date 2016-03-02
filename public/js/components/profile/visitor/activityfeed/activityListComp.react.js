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
import Paper from 'material-ui/lib/paper';
import LikesActions from '../../../../actions/ActivityFeed/LikesActions';
import ShareActions from '../../../../actions/ActivityFeed/ShareActions';
import LoginStore from '../../../../stores/LoginStore';
import StatusStore from '../../../../stores/StatusStore';
import ActivityFeedActions from '../../../../actions/ActivityFeed/ActivityFeedActions';
import CommentAction from '../../../../actions/ActivityFeed/CommentAction';
import CommentStore from '../../../../stores/CommentStore';
//import CommentList from '../comments/CommentList.react';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import LikeStatusStore from '../../../../stores/LikeStatusStore';
import Snackbar from 'material-ui/lib/snackbar';
import VisitorStore from '../../../../stores/VisitorStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

//tap-event-plugin
injectTapEventPlugin();

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

var a = 1;

const ActivityList = React.createClass({

    deleteStatus: function () {
        var postId = this.props.id;
        let delete_status = {
            PostId: postId
        };
        ActivityFeedActions.delete_status(delete_status);
    },

    addshare: function () {
        var postId = this.props.id;
        var email = LoginStore.getEmail();
        var firstname = LoginStore.getFirstname();
        let add_share = {
            PostId: postId,
            Email: email,
            Fname: firstname
        };
        ShareActions.add_share(add_share);
    },

    setFocusToTextBox: function () {
        document.getElementById("mytext").focus();
    },

    getInitialState: function () {
        return {
            open: false,
            liked: LikeStatusStore.getlikes(),
            postId: StatusStore.getStatusID(),
        };
    },

    componentDidMount: function () {
        LikeStatusStore.addChangeListener(this._onChange);
        LikesActions.getlikestatus();

        StatusStore.addChangeListener(this._onChange);
        ActivityFeedActions.getpostId();
    },

    _onChange: function () {
        this.setState({postId: StatusStore.getStatusID()});
        this.setState({liked: LikeStatusStore.getlikes()});

        if (LikeStatusStore.getlikes() == "false") {
            this.setState({
                liked: false,
            });
        }
        if (LikeStatusStore.getlikes() == "true") {
            this.setState({
                liked: true,
            });
        }
    },

    _changeLikeState: function () {

        var postId = this.props.id;
        console.log(postId);
        var email = LoginStore.getEmail();
        var firstname = LoginStore.getFirstname();
        let add_likes = {
            PostId: postId,
            Email: email,
            Fname: firstname
        };

        if (!this.state.liked) {
            console.log('like');
            this.setState({liked: !this.state.liked});
            LikesActions.like(add_likes);
        }
        else {
            console.log('Unlike');
            this.setState({liked: !this.state.liked});
            LikesActions.unlike(add_likes);
        }
    },

    handleOpen: function () {
        this.setState({open: true});
    },

    handleClose: function () {
        this.setState({open: false});
    },

   /* handleBoth: function () {
        if(this._handleRegisterClickEvent()) {
           this.setState({open: false});
        }
    },**/

    _handleUpdateClickEvent: function () {

        let post_text= this.refs.EditBox.getValue();
        let postId= this.props.id;

        let editstatus={
          PostId: postId,
          Status: post_text
          };

        // swal({  title: "Are you sure?",
        //         text: "Do you really want to update this post?",
        //         type: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#DD6B55",
        //         confirmButtonText: "Yes, Update!",
        //         cancelButtonText: "No, Cancel!",
        //         closeOnConfirm: false,
        //         closeOnCancel: false },
        //     function(isConfirm){
        //         if (isConfirm) {
        //             swal("Updated!", "This post has been updated.", "success");
        //             ActivityFeedActions.editstatus(editstatus);
        //             console.log('Done calling !');
        //         } else {
        //             swal("Cancelled", "This post isn't  still updated.", "error");
        //         } });
         this.handleClose();
    },

    EnterKey_comment(e) {
        if (e.key === 'Enter') {
            console.log();
            console.log(this.refs.commentBox.getValue());
            var postId = this.props.id;
            var comment = this.refs.commentBox.getValue();
            var email = LoginStore.getEmail();
            var firstname = LoginStore.getFirstname();
            let add_comment = {
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
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._handleUpdateClickEvent}/>,

      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

		return (
			<div className="col-lg-6">
			<div >
            <Card>
		        <ListItem
		          leftAvatar={<Avatar src={VisitorStore.getprofilepic()} />}
		          primaryText={this.props.firstname}
		          secondaryText={
		            <p>
		              <b>{this.props.created_at}</b><br/>
              			{this.props.post_text}

                        {this.props.image ? <img src={'img/profilepics/' + 

                        localStorage.getItem('username')}/> : ''}
		            </p>
		          }
		          secondaryTextLines={2}
		         />
		           	
             
                <IconButton onClick={this._changeLikeState} tooltip={this.state.liked ? "Unlike" : "Like"} touch={true} tooltipPosition="bottom-right">
                  {this.state.liked ? <FavIcon onClick={this._changeLikeState} viewBox="0 0 20 30" color={Colors.red500} /> : 
                            <FavIconBorder viewBox="0 0 20 30" color={Colors.red500} />}
                </IconButton>
               
    
          			<FlatButton label="Comment" onClick={this.setFocusToTextBox} />
          			<FlatButton label="Share" onClick={this.addshare}/>
		        <Divider inset={true} />	   
            </Card>	
                <Dialog
                     title="Modify Your Status"
                     actions={actions}
                     modal={false}
                     open={this.state.open}
                     onRequestClose={this.handleClose}>
                    <TextField hintText="Update your status" multiLine={false} fullWidth={true} ref="EditBox" defaultValue={this.props.post_text}/>
                </Dialog>
			</div>
            <div></div>
			<div>
              <Paper>
                <TextField hintText="Write a comment..." multiLine={false} fullWidth={true} onKeyPress={this.EnterKey_comment} ref="commentBox" id="mytext"/>
              </Paper>
            </div>
            <br/><br/>
			</div>
		);
	}
});

export default ActivityList;
