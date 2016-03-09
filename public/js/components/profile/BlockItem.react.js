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
import ActivityFeedStore from '../../stores/ActivityFeedStore';
import ActivityFeedActions from '../../actions/profile/ActivityFeedActions';

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

const BlockItem = React.createClass({
	getInitialState: function() {
		return {
			editing: false
		}
	},
	_editActvity: function() {
		ActivityFeedActions.editActvity(this.props.id);
		this.setState({
			editing: !this.state.editing
		});

	},
	_removeActivity: function() {

	},
	_cancelEdit: function() {
		this.setState({
			editing: !this.state.editing
		});
	},
	render: function() {
		return (
			<div>
		        <ListItem
		          leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
		          primaryText={ "@" + localStorage.getItem('user')}
		          secondaryText={
		            <p>
		            	<span style={{color: Colors.darkBlack}}>{this.props.post}</span>
		           		<br/>
		           		<b>{this.props.time}</b>
		            </p>
		          }
		          secondaryTextLines={2} 
		          rightIconButton={<IconMenu iconButtonElement={iconButtonElement}>
					    <MenuItem onTouchTap={this.props.onEdit(this.props.id)}>Edit</MenuItem>
					    <MenuItem onTouchTap={this.props.onRemove(this.props.id)}>Remove</MenuItem>
					  </IconMenu>} />

				{this.state.editing ? <div><TextField
	            ref="editActvity"  style={textStyle} defaultValue={this.props.post} /><FlatButton onClick={this._editActvity} label="Save changes" primary={true} /><FlatButton label="Cancel" onClick={this._cancelEdit}/>
	              </div> : ''}
		        <Divider inset={true} />			

			</div>
		);
	}
});

export default BlockItem;
