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
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);




const PreviousChat=React.createClass({
        render:function(){
           return(
             <List subheader="Previous Chat">
                 <ListItem leftAvatar={<Avatar src="http://vignette1.wikia.nocookie.net/family-guy-fanverse/images/d/d7/Stewie-griffin.gif/revision/latest?cb=20140215140724" />}
                   rightIconButton={rightIconMenu}
                   primaryText="Brendan Lim"
                  secondaryText={
                    <p>
                  <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
                  I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                    </p>
                }
              secondaryTextLines={2}/>

     <Divider inset={true} />
            </List>
           )
        }
});

export default PreviousChat;
