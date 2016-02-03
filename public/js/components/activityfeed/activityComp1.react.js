import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';

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

var CardWithAvatar = React.createClass({
  render:function(){
    return(
      <div>
      <Card>
        <CardHeader
          title="Diylon"
          subtitle="2016.01.20"
          avatar="http://all4desktop.com/data_images/original/4237684-images.jpg" />
        
        <CardText>
          :o ;)
        </CardText>

        <CardMedia>
          <img src="http://all4desktop.com/data_images/original/4237684-images.jpg" />
        </CardMedia>

        <CardActions>
          <FlatButton label="Like" />
          <FlatButton label="Comment" />
          <FlatButton label="Share" />
        </CardActions>
      </Card>
    </div>
   );
  }
});

export default CardWithAvatar;


