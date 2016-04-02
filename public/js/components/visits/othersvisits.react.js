import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
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
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Colors from 'material-ui/lib/styles/colors';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Dialog from 'material-ui/lib/dialog';

import ThreadActions from '../../actions/Thread/ThreadActions';

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
    <MenuItem>Block</MenuItem>
  </IconMenu>
);



const othervisits = React.createClass({

  handleOpen: function () {
    this.setState({ open: true });
    console.log('Blocked!');
     blockUser();
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

 blockUser: function () {
 ThreadActions.block(this.props.username, localStorage.getItem('user'));
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
              onTouchTap={this.handleClose}
            />,
          ];
             return(
               <div>
                   <ListItem
                      primaryText={this.props.fistname}
                      leftAvatar={<Avatar src="images/ok-128.jpg" />}
                      rightIconButton={ <IconMenu iconButtonElement={iconButtonElement}>
                          <MenuItem onTouchTap={this.handleOpen}>Block</MenuItem>
                        </IconMenu>}
                     />
                  <Divider/>
                  <Dialog
                    title="Block your Followeres"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                    Are you sure you want to Block this user?.
                  </Dialog>
               </div>
             );
      }

});

export default othervisits;
