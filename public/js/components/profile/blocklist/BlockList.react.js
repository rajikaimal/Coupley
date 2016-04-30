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
import ActivityFeedStore from '../../../stores/ActivityFeedStore';
import ActivityFeedActions from '../../../actions/profile/ActivityFeedActions';


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

const BlockList = React.createClass({
	_remove: function() {
		this.props.onRemove(this.props.username);
	},
	render: function() {
		return (
			<div>
		        <ListItem
		          leftAvatar={<Avatar src={this.props.image} />}
		          primaryText={this.props.firstname + ' ' + this.props.lastname}
		          secondaryText={
		            <p>
		            	<span style={{color: Colors.darkBlack}}>{this.props.post}</span>
		           		<br/>
		           		<b>{this.props.time}</b>
		            </p>
		          }
		          secondaryTextLines={2} 
		          rightIconButton={<IconMenu iconButtonElement={iconButtonElement}>
					    <MenuItem onTouchTap={this._remove}>Unblock</MenuItem>
					  </IconMenu>} />

			
		        <Divider inset={true} />			

			</div>
		);
	}
});

export default BlockList;
