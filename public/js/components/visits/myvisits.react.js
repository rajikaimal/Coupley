import React from 'react';
import Card from 'material-ui/lib/card/card';
import Avatar from 'material-ui/lib/avatar';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';
import Dialog from 'material-ui/lib/dialog';

import ThreadActions from '../../actions/Thread/ThreadActions';
import VisitsActions from '../../actions/VisitsAction';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Unfollow</MenuItem>
  </IconMenu>
);




const myvisits = React.createClass({

  handleOpen: function () {
    this.setState({ open: true });
  },

  handleClose: function () {
    this.setState({ open: false });
  },


 deletemyfollow:function () {

   console.log('follower deleted!');

 },

 getInitialState: function () {
   return {
     open: false,
   };
 },

 unFollow: function (){
   console.log(localStorage.getItem('username'));
   console.log(this.props.username);
   VisitsActions.unfollowUser(this.props.username, localStorage.getItem('username'));
   this.setState({ open: false });
 },

      render:function(){
        const actions = [
            <FlatButton
              label="No"
              secondary={true}
              onTouchTap={this.handleClose}
            />,
            <FlatButton
              label="Yes"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.unFollow}
            />,
          ];
             return(
              <div>
                  <ListItem
                     primaryText={this.props.fistname}
                     leftAvatar={<Avatar src="images/ok-128.jpg" />}
                     rightIconButton={  <IconMenu iconButtonElement={iconButtonElement}>
                         <MenuItem onTouchTap={this.handleOpen}>Unfollow</MenuItem>
                       </IconMenu>}
                    />
                 <Divider/>
                 <Dialog
                   title="Unfollow your user"
                   actions={actions}
                   modal={false}
                   open={this.state.open}
                   onRequestClose={this.handleClose}
                 >
                   Are you sure you want to Unfollow this user?.
                 </Dialog>
              </div>
             );
      }

});

export default myvisits;
