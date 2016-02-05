import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import CommentBox from './CommentBox.react';
import LikesActions from '../../actions/ActivityFeed/LikesActions';
import ShareActions from '../../actions/ActivityFeed/ShareActions';
import LoginStore from '../../stores/LoginStore';

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
    <MenuItem>Block</MenuItem>
  </IconMenu>
);

const style = {
  width: 1000,
  margin: 40,
};


const ActivityList = React.createClass({

	addlike:function(){
        var email= LoginStore.getEmail(); 
        var firstname = LoginStore.getFirstname();
        let add_likes={
            Email: email,
            Fname: firstname
        };
        LikesActions.add_likes(add_likes);
	},

  	addshare:function(){
        var email= LoginStore.getEmail(); 
        var firstname = LoginStore.getFirstname();
        let add_share={
            Email: email,
            Fname: firstname
        };
        ShareActions.add_share(add_share);
  	},

	render: function() {
		return (
			<div>
			<div style={style}>
		        <ListItem
		          leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
		          primaryText="Tiffany"
		          secondaryText={
		            <p>
		              <b>"2016.02.05"</b><br/>
              			{this.props.post_text}
		            </p>
		          }
		          secondaryTextLines={2} 
		          rightIconButton={rightIconMenu} />
		           	<FlatButton label="Like" onClick={this.addlike}/>
          			<FlatButton label="Comment" />
          			<FlatButton label="Share" onClick={this.addshare}/>
		        <Divider inset={true} />			
			</div>
				<div><CommentBox/></div>
			</div>
		);
	}
});

export default ActivityList;

