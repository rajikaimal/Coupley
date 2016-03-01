import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import FavIcon from 'material-ui/lib/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import ProfileVisitorActions from '../../../actions/ProfileVisitorActions';
import VisitorStore from '../../../stores/VisitorStore';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import GridList from 'material-ui/lib/grid-list/grid-list';
import Dialog from 'material-ui/lib/dialog';

const style = {
  width: 200,
  borderRadius: 20
};

const iconButtonStyle = {

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

const ProfilePic = React.createClass({
  getInitialState: function() {
    return {
      liked: VisitorStore.getlikestatus(),
      likedback: VisitorStore.getlikedbackstatus(),
      blocked: VisitorStore.getblockstatus(),
      permission: VisitorStore.getpermission(),
      picture: VisitorStore.getprofilepic(),
      open: false
    }
  },
  componentDidMount: function() {
    VisitorStore.addChangeListener(this._onChange);
    ProfileVisitorActions.getpermission();
    ProfileVisitorActions.getlikestatus();
    ProfileVisitorActions.getlikedbackstatus();
    ProfileVisitorActions.getblockstatus();

    ProfileVisitorActions.fetchProfilePicture();
  },
  _onChange: function() {
    if(VisitorStore.getlikestatus() == "false") {
      this.setState({
        liked: false,
        likedback: VisitorStore.getlikedbackstatus()
      });  
    }
    if(VisitorStore.getlikestatus() == "true") {
      this.setState({
        liked: true,
        likedback: VisitorStore.getlikedbackstatus()
      });
    }

    this.setState({
      blocked: VisitorStore.getblockstatus()
    });

    this.setState({
      permission: VisitorStore.getpermission()
    });

    this.setState({
      picture: VisitorStore.getprofilepic()
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
              <span> {this.props.country} </span>
              {this.state.permission ?  
                <IconButton style={iconButtonStyle} onClick={this._changeLikeState} tooltip={this.state.liked ? "Unlike" : "Like"} touch={true} tooltipPosition="bottom-right">
                  {this.state.liked ? <FavIcon onClick={this._changeLikeState} viewBox="0 0 20 30" color={Colors.red500} /> : 
                            <FavIconBorder viewBox="0 0 20 30" color={Colors.red500} />}
                </IconButton>
              : ''}
              
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
                <li> And this person won't be able to find you on Coupley </li>
              </ul>
          </Dialog>
          </div> 
      </div>  
    );
  }

});

export default ProfilePic;