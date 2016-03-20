import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ThreadActions from '../../actions/Thread/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

const ListStyle = {
  width: 300,
};

const PreviousChat = React.createClass({

  deleteconvo:function () {
    var user2 = this.props.firstname;
    let deleteM = {
             user2:user2,
           };
    ThreadActions.deleteM(deleteM);
    console.log('Done deleting!');
  },

  render:function () {
          return (
             <List style={ListStyle}>
                 <ListItem leftAvatar={<Avatar src="http://vignette1.wikia.nocookie.net/family-guy-fanverse/images/d/d7/Stewie-griffin.gif/revision/latest?cb=20140215140724" /> }
                   rightIconButton={
                     <IconMenu iconButtonElement={iconButtonElement}>
                       <MenuItem primaryText="Delete" onClick={this.deleteconvo}/>
                     </IconMenu>
                   }
                   primaryText={this.props.Firstname}
                  secondaryText={
                    <p>
                  <span style={ { color: Colors.darkBlack } }>{this.props.message}</span><br/>
                  { this.props.created_at }
                    </p>
                }
              secondaryTextLines={2}/>

     <Divider inset={false} />
            </List>
          );
        },
});

export default PreviousChat;
