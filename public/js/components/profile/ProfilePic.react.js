import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import injectTapEventPlugin from 'react-tap-event-plugin';

//tap-event-plugin
injectTapEventPlugin();

const style = {
  width: 200,
  borderRadius: 20
};

const divStyle = {
  float: 'right'
};  

const ProfilePic = React.createClass({
  _edit: function() {
    alert('');
  },  
  render: function() {
    return (
      <div>
      	<div className="panel-body">
          <div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <img src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" style={style} />
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <h3> {this.props.firstname} {this.props.lastname} </h3>
              <span> {this.props.country} </span>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div style={divStyle}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                  <MenuItem primaryText="Edit profile" onTouchTap={this._edit} />
                </IconMenu>
              </div>
            </div>
          </div>
        </div> 	
      </div>  
    );
  }

});

export default ProfilePic;