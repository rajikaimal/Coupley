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
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Status</MenuItem>
  </IconMenu>
);


var chatbox=React.createClass({
  render:function(){
    return(
       <div>
       <TextField hintText="Message" multiLine={true} />
       </div>
    )
  }
});

const textf_style={

}


const ListExampleMessages = () => (

  <div>
  <div className='col-lg-3'>
      <List subheader="Today">
        <ListItem
          leftAvatar={<Avatar src="images/ok-128.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Brendan Lim"
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2} />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/kolage-128.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="me, Scott, Jennifer"
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Summer BBQ</span><br/>
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2} />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Grace Ng"
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Oui oui</span><br/>
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2} />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/kerem-128.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Birthday gift</span><br/>
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2} />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Raquel Parrado"
          secondaryText={
            <p>
              <span style={{color: Colors.darkBlack}}>Recipe to try</span><br/>
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2} />
      </List>
  </div>
  <div className='col-lg-7'>
  <List subheader="Today1">
    <ListItem
      leftAvatar={<Avatar src="images/ok-128.jpg" />}
      primaryText="Brunch this weekend?"
      secondaryText={
        <p>
          <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
      }
      secondaryTextLines={2} />
    <Divider inset={true} />
    <ListItem
      leftAvatar={<Avatar src="images/kolage-128.jpg" />}
      primaryText={
        <p>Summer BBQ&nbsp;&nbsp;<span style={{color: Colors.lightBlack}}>4</span></p>
      }
      secondaryText={
        <p>
          <span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> --
          Wish I could come, but I&apos;m out of town this weekend.
        </p>
      }
      secondaryTextLines={2} />
    <Divider inset={true} />
    <ListItem
      leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
      primaryText="Oui oui"
      secondaryText={
        <p>
          <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
          Do you have Paris recommendations? Have you ever been?
        </p>
      }
      secondaryTextLines={2} />
    <Divider inset={true} />
    <div class={textf_style}>
       <TextField hintText="Message" multiLine={true}/>
    </div>
    <Divider inset={true} />
  </List>
  </div>
  </div>
);

export default ListExampleMessages;
