import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import FavIcon from 'material-ui/lib/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import Gender from 'material-ui/lib/svg-icons/action/account-box';
import Age from 'material-ui/lib/svg-icons/action/alarm';
import Country from 'material-ui/lib/svg-icons/action/room';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import ProfileVisitorActions from '../../../actions/ProfileVisitorActions';
import VisitorStore from '../../../stores/VisitorStore';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import GridList from 'material-ui/lib/grid-list/grid-list';
import Dialog from 'material-ui/lib/dialog';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import TextField from 'material-ui/lib/text-field';
import Snackbar from 'material-ui/lib/snackbar';

const style = {
  width: 200,
  borderRadius: 20
};

const iconButtonStyle = {

}

const reportStyle = {
    color: 'black',
    marginTop: '25'
}

const styles = {
  root: {

  },
  gridList: {
    width: 425,
    height: 250,
  },
};

const divStyle = {
    float: 'right'
};

const textStyle = {
  marginLeft: 15
};

const ProfilePic = React.createClass({
  getInitialState: function() {
    return {
      liked: VisitorStore.getLikeStatus(),
      likedback: VisitorStore.getLikedbackStatus(),
      blocked: VisitorStore.getBlockStatus(),
      permission: VisitorStore.getPermission(),
      picture: VisitorStore.getProfilePic(),
      open: false,
      openDialog: false,
      type: 'annoying',
    }
  },
  componentDidMount: function() {
    VisitorStore.addChangeListener(this._onChange);
    ProfileVisitorActions.getPermission();
    ProfileVisitorActions.getLikeStatus();
    ProfileVisitorActions.getLikedbackStatus();
    ProfileVisitorActions.getBlockStatus();

    ProfileVisitorActions.fetchProfilePicture();

    //invoke action method to increment visitor count in back-end via AJAX request
    let visitorUsername = localStorage.getItem('username');
    let str = window.location.hash;
    let username = str.split(/[\/?]/)[1];

    let data = {
      visitorusername: visitorUsername,
      username: username
    };
    ProfileVisitorActions.visitor(data);
  },
  _onChange: function() {
    if(VisitorStore.getLikeStatus() == "false") {
      this.setState({
        liked: false,
        likedback: VisitorStore.getLikedbackStatus()
      });  
    }
    if(VisitorStore.getLikeStatus() == "true") {
      this.setState({
        liked: true,
        likedback: VisitorStore.getLikedbackStatus()
      });
    }

    this.setState({
      blocked: VisitorStore.getBlockStatus()
    });

    this.setState({
      permission: VisitorStore.getPermission()
    });

    this.setState({
      picture: VisitorStore.getProfilePic()
    });

    this.setState({
      openSnackBar: VisitorStore.getDoneStatus()
    });
  },
  _changeLikeState: function() {
    if(! this.state.liked) {
      this.setState({
        liked: ! this.state.liked
      });
      ProfileVisitorActions.like();
    }
    else {
      console.log('Unlike');
      this.setState({
        liked: ! this.state.liked
      });
      ProfileVisitorActions.unlike();
    }
  },
  _handleBlock: function() {
    if(! this.state.blocked) {
      ProfileVisitorActions.block();
    }
    else if(this.state.blocked) {
      ProfileVisitorActions.unblock();
    }
    this.setState({
      blocked: !this.state.blocked,
      open: false
    });
  },
  _handleBlockSelection: function() {
    this.setState({open: true});
  },
  handleClose: function() {
    this.setState({
      open: false
    });
  },
  _handleReport: function() {
    this.setState({
      openDialog: true
    });
  },
  handleCloseReport: function() {
    this.setState({
      openDialog: false
    });
  },
  handleSubmitReport: function() {
    let type = this.state.type;
    let comment = this.refs.comment.getValue();
    let username = localStorage.getItem('username');
    let str = window.location.hash;
    let visitorUsername = str.split(/[\/?]/)[1];

    let data = {
      username: username,
      visitorusername: visitorUsername,
      type: type,
      comment: comment
    };
    ProfileVisitorActions.reportUser(data);
    this.setState({
      openDialog: false
    });
  },
  render: function() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Got it"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._handleBlock}
      />,
    ];
    const actionsReport = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleCloseReport}
      />,
      <FlatButton
        label="Report"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmitReport}
      />,
    ];
    return (
      <div>
      	<div className="panel-body">
          <div>
            <div className="col-sm-3 col-md-3 col-lg-3">
                <GridList
                  cellHeight={200}
                  style={styles.gridList}
                >
                  <GridTile>
                    <img src={this.state.picture} />
                  </GridTile>
                </GridList>
            </div>
            <div className="col-lg-3">
              <h3> {this.props.firstname} {this.props.lastname} </h3>
              <span> <IconButton style={iconButtonStyle} tooltip="age" tooltipPosition="bottom-right">
                            <Age viewBox="0 0 20 30" />
                </IconButton>{this.props.age} </span> <br/>
              <span> <IconButton style={iconButtonStyle} tooltip="gender" tooltipPosition="bottom-right">
                            <Gender viewBox="0 0 20 30" />
                </IconButton>{this.props.gender} </span> <br/>
              <span><IconButton style={iconButtonStyle} tooltip="country" tooltipPosition="bottom-right">
                            <Country viewBox="0 0 20 30" />
                </IconButton>{this.props.country} </span>
              {this.state.permission ?  
                <IconButton style={iconButtonStyle} onClick={this._changeLikeState} tooltip={this.state.liked ? "Unlike" : "Like"} touch={true} tooltipPosition="bottom-right">
                  {this.state.liked ? <FavIcon onClick={this._changeLikeState} viewBox="0 0 20 30" color={Colors.red500} /> : 
                            <FavIconBorder viewBox="0 0 20 30" color={Colors.red500} />}
                </IconButton>
              : ''
              }
              
              <br/>
              {
                this.state.likedback ? "😇 " + this.props.firstname + " has liked you": this.state.lastname
              }
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
                  <div style={divStyle}>
                      <IconMenu
                          iconButtonElement={<IconButton>
                              <MoreVertIcon />
                          </IconButton>}
                          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      >
                          { this.state.permission ? (this.state.blocked ? <MenuItem primaryText="Unblock" onTouchTap={this._handleBlock} /> : 
                                      <MenuItem primaryText="Block" onTouchTap={this._handleBlockSelection} /> ) : ''
              }
                          <MenuItem primaryText="Report" onTouchTap={this._handleReport} />
                      </IconMenu>
                  </div>
            </div>
        </div>
         <div>
          <Dialog
               title="Block user"
               actions={actions}
               modal={false}
               open={true}
               open={this.state.open}
              onRequestClose={this.handleClose} >
              You are going to block this user
              If you proceed ...
              <ul>
                <li> You won't be able to find this user on search </li>
                <li> You'll remove all your connections including likes </li>
                <li> And this person wont be able to find you on Coupley </li>
              </ul>
          </Dialog>
          </div> 
          <div>
              <Dialog
                    title="Report user"
                    actions={actionsReport}
                    modal={true}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}
                    contentStyle={{ height:1000 }}
                  >
                  Category
                  <DropDownMenu value={this.state.type} onChange={this._handleChange}>
                    <MenuItem value="annoying" primaryText="Annoying"/>
                    <MenuItem value="clingy" primaryText="Clingy"/>
                    <MenuItem value="harassing" primaryText="Harassing"/>
                  </DropDownMenu>
                  <br/>
                  Comment 
                  <TextField
                      hintText="optional comment"
                      multiLine={true}
                      rows={2}
                      rowsMax={4}
                      errorText={this.state.commenterr} hintText="comment" style={textStyle} fullwidth={true} ref="comment" />
                  <br />
              </Dialog>
                <Snackbar
                    open={this.state.openSnackBar}
                    message="Successfully posted !"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                  />
            </div>
      </div>  
    );
  }

});

export default ProfilePic;