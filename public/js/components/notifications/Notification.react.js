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

const Notification = React.createClass({
	render: function() {
		return (
			<div>
		        <ListItem
		          leftAvatar={<Avatar src="img/profilepics/tiffany" />}
		          primaryText="rajika"
		          secondaryText={
		            <p>
		            	<span style={{color: Colors.darkBlack}}>{this.props.id  + ' ' + this.props.profilepic}</span>
		            </p>
		          }
		        />

			
		        <Divider inset={true} />			

			</div>
		);
	}
});

export default Notification;
