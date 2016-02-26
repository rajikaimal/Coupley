import React from 'react';
import FavIcon from 'material-ui/lib/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import ProfileVisitorActions from '../../../actions/ProfileVisitorActions';
import VisitorStore from '../../../stores/VisitorStore';

const style = {
  width: 200,
  borderRadius: 20
};

const iconButtonStyle = {
  width: 500,
  height: 500
}

const ProfilePic = React.createClass({
  getInitialState: function() {
    return {
      liked: VisitorStore.getlikestatus(),
      likedback: VisitorStore.getlikedbackstatus(),
      blocked: VisitorStore.getblockstatus(),
      permission: VisitorStore.getpermission()
    }
  },
  componentDidMount: function() {
    VisitorStore.addChangeListener(this._onChange);
    ProfileVisitorActions.getpermission();
    ProfileVisitorActions.getlikestatus();
    ProfileVisitorActions.getlikedbackstatus();
    ProfileVisitorActions.getblockstatus();
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
      blocked: !this.state.blocked
    });
  },
  render: function() {
    return (
      <div>
      	<div className="panel-body">
          <div>
            <div className="col-lg-3">
              <img src="/img/emma.jpg" style={style} />
            </div>
            <div className="col-lg-3">
              <h3> {this.props.firstname} {this.props.lastname} </h3>
              <span> {this.props.country} </span>
              {this.state.permission ?  
                <IconButton style={iconButtonStyle} onClick={this._changeLikeState} tooltip={this.state.liked ? "Unlike" : "Like"} touch={true} tooltipPosition="bottom-right">
                  {this.state.liked ? <FavIcon onClick={this._changeLikeState} viewBox="0 0 5 10" color={Colors.red500} /> : 
                            <FavIconBorder viewBox="0 0 20 30" color={Colors.red500} />}
                </IconButton>
              : ''}
              
              <br/>
              {
                this.state.likedback ? "😇 " + this.props.firstname + " has liked you": this.state.lastname
              }
            </div>
            <div className="col-lg-3 col-lg-offset-3">
              { this.state.permission ? (this.state.blocked ? <FlatButton onClick={this._handleBlock} label="Unblock user" primary={true} /> : 
                                      <FlatButton onClick={this._handleBlock} label="Block user" primary={true} /> ) : ''
              }
            </div>
          </div>
        </div> 	
      </div>  
    );
  }

});

export default ProfilePic;