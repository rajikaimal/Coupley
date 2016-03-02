import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Avatar from 'material-ui/lib/avatar';
import TextField from 'material-ui/lib/text-field';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/lib/flat-button';
import AboutActions from '../../../actions/profile/visitor/AboutActions';
import AboutStore from '../../../stores/VisitorAboutStore';
import ErrorStore from '../../../stores/ErrorStore';
import Snackbar from 'material-ui/lib/snackbar';

//tap-event-plugin
injectTapEventPlugin();

function validate(data) {
  if(data.length >= 100) {
    return {
      "error": "*limit exceeded"
    }
  }
  else if(data === "") {
    return {
      "error": "*cannot be empty"
    }
  }
  else {
    return true;
  }
}

const error = {
    color: Colors.red500,
    fontSize: 15
};

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
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

const textStyle = {
    marginLeft: "15"
}

const About = React.createClass({
  getInitialState: function() {
    return {
        editing: false,
        editingLife: false,
        editingGoodat: false,
        editingThinkingof: false,
        editingFavs: false,
        error: false,
        summary: AboutStore.getsummary(),
        life: AboutStore.getlife(),
        goodat: AboutStore.getgoodat(),
        spendtime: AboutStore.getspendtime(),
        favs: AboutStore.getfavs()
    };
  },
    componentDidMount: function () {
        let str = window.location.hash;
        let visitorUsername = str.split(/[\/?]/)[1];
        AboutActions.fetchAll(visitorUsername);
        AboutStore.addChangeListener(this._onChange);
        ErrorStore.addChangeListener(this._onChange);
  },
    _onChange: function () {
        this.setState({
            summary: AboutStore.getsummary(),
            life: AboutStore.getlife(),
            goodat: AboutStore.getgoodat(),
            spendtime: AboutStore.getspendtime(),
            favs: AboutStore.getfavs(),
            error: ErrorStore.getabouterr()
    });
  },
  render: function() {
    return (
      <div>      
        <List>
            <ListItem key="Self summary"
                primaryText="Self summary"

                secondaryText={this.state.summary}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    
                </IconButton>}>
                    
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>S</Avatar>} />
            
            <ListItem key="What Im doing"
                primaryText="What I'm doing with my life ?"
                secondaryText={this.state.life}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    
                </IconButton>}>
                    
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>W</Avatar>} />
            
            <ListItem key="Really good at"
                primaryText="I'm really good at"
                secondaryText={this.state.goodat}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    
                </IconButton>}>
                    
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>R</Avatar>} />
            
            <ListItem key="I spend alot"
                primaryText="I spend a lot of time thinking about"
                secondaryText={this.state.spendtime}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    
                </IconButton>}>
                    
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>I</Avatar>} />
            
            <ListItem key="Books food movies"
                primaryText="Favourite Books, Movies, Food <3"
                secondaryText={this.state.favs}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    
                </IconButton>}>
                    
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>F</Avatar>} />
            
        </List>
        <Snackbar
            open={this.state.error}
            message="Error occured, please try again later"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose} />
      </div>  
    );    
  }

});

export default About;