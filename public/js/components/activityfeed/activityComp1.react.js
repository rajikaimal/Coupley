import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';


const CardExampleWithAvatar = () => (
  <Card>
    <CardHeader
      title="URL Avatar"
      subtitle="Subtitle"
      avatar="http://lorempixel.com/100/100/nature/"
    />
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
    >
      <img src="http://lorempixel.com/600/337/nature/" />
    </CardMedia>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardActions>
      <FlatButton label="Comment" />
      <FlatButton label="Share" />
    </CardActions>
  </Card>
);

export default CardExampleWithAvatar;

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

const AvatarExampleSimple = () => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem primaryText="Edit" />
      <MenuItem primaryText="Remove" />
      <MenuItem primaryText="Block" />
    </IconMenu>
  </div>
);

const style = {
  width: 800,
  margin: 40,
};

var CardWithAvatar = React.createClass({

  render:function(){
    return(
      <div style={style}>
      <Card>
        <CardHeader
          title="Diylon"
          subtitle="2016.01.20"
          avatar="http://all4desktop.com/data_images/original/4237684-images.jpg" />

          <div><AvatarExampleSimple /></div>

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
