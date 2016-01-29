import React from 'react';
import FavIcon from 'material-ui/lib/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';

const style = {
  width: 200,
  borderRadius: 20
};

const ProfilePic = React.createClass({
  getInitialState: function() {
    return {
      liked: false
    }
  },
  componentDidMount: function() {
    
  },
  _changeLikeState: function() {
    this.setState({
      liked: ! this.state.liked
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
            <div className="col-lg-6">
              <h3> {this.props.firstname} {this.props.lastname} </h3>
            </div>
            <div className="col-lg-6">
              <span> {this.props.country} </span>           
              <IconButton onClick={this._changeLikeState} tooltip="Like Status" touch={true} tooltipPosition="bottom-right">
                {this.state.liked ? <FavIcon onClick={this._changeLikeState} viewBox="0 0 20 30" color={Colors.red500} /> : 
                          <FavIconBorder viewBox="0 0 20 30" color={Colors.red500} />}
              </IconButton>
            </div>
            
          </div>
        </div> 	
      </div>  
    );
  }

});

export default ProfilePic;