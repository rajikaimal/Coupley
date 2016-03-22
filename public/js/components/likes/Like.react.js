import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
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

const textStyle = {
  marginLeft: "15"
}

const Like = React.createClass({
	_remove: function() {
		this.props.onRemove(this.props.username);
	},
	_gotoProfile: function() {
		console.log('Click lickckak');
		window.location = "/#/" + this.props.username + "/about";
	},
	render: function() {
		return (
			<div>
		        <ListItem
		          leftAvatar={<Avatar src={this.props.image} />}
		          primaryText={this.props.firstname + " " + this.props.lastname}
		          secondaryTextLines={2} 
		          onTouchTap={this._gotoProfile}
		        />
		        <Divider inset={true} />			

			</div>
		);
	}
});

export default Like;
