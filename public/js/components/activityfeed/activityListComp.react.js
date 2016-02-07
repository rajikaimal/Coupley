import React from 'react';
import Card from 'material-ui/lib/card/card';
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
import ActivityFeedStore from '../../stores/ActivityFeedStore'
import ActivityFeedActions from '../../actions/ActivityFeed/ActivityFeedActions';
//import CommentBox from '../comments/CommentBox.react';

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
    <MenuItem primaryText="Edit" />
    <MenuItem primaryText="Remove"/>
    <MenuItem primaryText="Block" />
  </IconMenu>
);

const style = {
  width: 1000,
  margin: 40,
};


const ActivityList = React.createClass({

     editStatus:function(){
        var postId= this.props.id;
        var post_text= this.props.post_text;
     },

     deleteStatus:function(){
        var postId= this.props.id;
        let delete_status={
          PostId: postId
        };
        ActivityFeedActions.delete_status(delete_status);
     },

	   addlike:function(){
        var postId= this.props.id;
        console.log(postId);
        var email= LoginStore.getEmail(); 
        var firstname = LoginStore.getFirstname();
        let add_likes={
            PostId: postId,
            Email: email,
            Fname: firstname
        };
        LikesActions.add_likes(add_likes);
	   },

  	addshare:function(){
        var postId= this.props.id;
        var email= LoginStore.getEmail(); 
        var firstname = LoginStore.getFirstname();
        let add_share={
            PostId: postId,
            Email: email,
            Fname: firstname
        };
        ShareActions.add_share(add_share);
  	},

	render: function() {
		return (
			<div>
			<div style={style}>
      <Card>
		        <ListItem
		          leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
		          primaryText={this.props.firstname}
		          secondaryText={
		            <p>
		              <b>{this.props.created_at}</b><br/>
              			{this.props.post_text}
		            </p>
		          }
		          secondaryTextLines={2} 
		          rightIconButton={rightIconMenu} />
		           	<FlatButton label="Like" onClick={this.addlike}/>
          			<FlatButton label="Comment" />
          			<FlatButton label="Share" onClick={this.addshare}/>
		        <Divider inset={true} />	
            </Card>		
			</div>
				<div><CommentBox /></div>
			</div>
		);
	}
});

export default ActivityList;

