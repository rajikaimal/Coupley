import React from 'react';
import Card from 'material-ui/lib/card/card';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import Dialog from 'material-ui/lib/dialog';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';
import ActivityfeedAction from '../../actions/ActivityFeed/ActivityfeedAction';
import LikeStatusStore from '../../stores/LikeStatusStore';
import StatusStore from '../../stores/StatusStore';

const style2 = {
  width: 800,
};

var firstname;
var sfirstname;
var username;
var susername;

const CountBox = React.createClass({
   getInitialState: function () {
    return {
      likedUsers: LikeStatusStore.getLikedUsers(),
      sharedUsers: StatusStore.getSharedUsers(),
      open: false,
      firstname: '',
      sfirstname: '',
      username: '',
      susername: '',
    };
  },

  componentDidMount: function () {
    LikeStatusStore.addChangeListener(this._onChange);

    let likeData = {
      postId: this.props.post_id,
    };
    ActivityfeedAction.getLikedUsers(likeData);

    let shareData = {
      postId: this.props.post_id,
    };
    ActivityfeedAction.getSharedUsers(shareData);
  },

  _onChange: function () {
    this.setState({likedUsers: LikeStatusStore.getLikedUsers()});
    this.setState({sharedUsers: StatusStore.getSharedUsers()}); 
  },

   handleClose: function () {
    this.setState({open: false});  
    this.setState({open2: false});
  },

  _getLikedUsers: function () {
    this.setState({open: true});

    let self = this;
    return (this.state.likedUsers.map(function(likes) {
      return (likes.map(function(result) {
        if(self.props.post_id == result.post_id) {
            firstname=result.firstname;
            username=result.username;
            self.setState({
                firstname: firstname,
                username: username
            });
          }
      }));
    }));
  },

  _getSharedUsers: function () {
    this.setState({open2: true}); 
    this.setState({sharedUsers: StatusStore.getSharedUsers()});
    let self = this;
    return (this.state.sharedUsers.map(function(shares) {
      return (shares.map(function(result) {
        if(self.props.post_id == result.post_id) {
                firstname=result.firstname;
                username=result.username;
                self.setState({
                  sfirstname: firstname,
                  susername: username
                });
          }
      }));
    }));
  },

    render: function () {
        const likeActions = [
          <FlatButton
            label="Close"
            secondary={true}
            onTouchTap={this.handleClose}/>,
        ];

        const sharedActions = [
          <FlatButton
            label="Close"
            secondary={true}
            onTouchTap={this.handleClose}/>,
        ];

        return (
            <div>
                <Card style={style2}>
                    <Paper zDepth={1}>
                       <FlatButton label={this.props.likedCount + " Likes"} onClick={this._getLikedUsers}/>
                       <FlatButton label={this.props.shareCount + " Shares"} onClick={this._getSharedUsers}/>
                    </Paper>
                </Card>

                <Dialog
                    autoDetectWindowHeight={false}
                    title="Liked Users"
                    actions={likeActions}
                    modal={true}
                    open={this.state.open}>
                       
                       <ListItem 
                        leftAvatar={<Avatar src={'img/profilepics/'+ this.state.username}/>}
                        primaryText={this.state.firstname} />
                      <Divider inset={true} />  
                </Dialog>

                <Dialog
                    autoDetectWindowHeight={false}
                    title="Shared Users"
                    actions={sharedActions}
                    modal={true}
                    open={this.state.open2}>
                       
                      <ListItem 
                        leftAvatar={<Avatar src={'img/profilepics/'+ this.state.susername} />}
                        primaryText={this.state.sfirstname} />
                      <Divider inset={true} />
                </Dialog>
            </div>
        );
    }
});

export default CountBox;
