import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
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

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Remove</MenuItem>
  </IconMenu>
);

const Activity = React.createClass({
	render: function() {
		return (
			<div>
		        <ListItem
		          leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
		          primaryText={this.props.heading}
		          secondaryText={
		            <p>
		              <b> {this.props.date} {this.props.time} </b><br/>
		              <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
		              {this.props.description}
		            </p>
		          }
		          secondaryTextLines={2}
		          rightIconButton={rightIconMenu} />
		        <Divider inset={true} />
			</div>
		);
	}
});

export default Activity;
