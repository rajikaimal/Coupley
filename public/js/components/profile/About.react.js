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
import AboutActions from '../../actions/profile/AboutActions';
import AboutStore from '../../stores/AboutStore';

//tap-event-plugin
injectTapEventPlugin();

const details = [{
  "summary": "Summary of myself !",
  "Age": "Hello !"
}, {
  "summary": "What I'm doing ?",
  "Age": "Bla bla ..."
},
{
  "summary": "Good at !",
  "Age": "Bla bla ..."
},
{
  "summary": "Favourite movies, books ...",
  "Age": "Bla bla ..."
},{
  "summary": "Could live never without",
  "Age": "Bla bla ..."
}];


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
      summary: AboutStore.getsummary(),
      life: AboutStore.getlife(),
      goodat: AboutStore.getgoodat(),
      spendtime: AboutStore.getspendtime(),
      favs: AboutStore.getfavs()
    };
  },
  componentDidMount: function() {
    AboutActions.fetchAll();
    AboutStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      summary: AboutStore.getsummary(),
      life: AboutStore.getlife(),
      goodat: AboutStore.getgoodat(),
      spendtime: AboutStore.getspendtime(),
      favs: AboutStore.getfavs()
    });
  },
  _toggle: function() {
    this.setState({
      editing: !this.state.editing
    });
  },
  _editSummary: function() {
    AboutActions.updatesummary(this.refs.summary.getValue());
    this.setState({
      editing: !this.state.editing
    });
  },
  render: function() {
    return (
      <div>        
        <List>
            <ListItem key="Self summary"
                  primaryText="Self summary"
                  
                  secondaryText={this.state.summary}
                  rightIconButton={<IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}> 
                    <MenuItem onTouchTap={this._toggle} primaryText="Edit"  />
                  </IconMenu>}
                  leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                  style={{left: 8}}>S</Avatar>} />
            {this.state.editing ? <div><TextField
            ref="summary"  style={textStyle} defaultValue={this.state.summary} /><FlatButton onClick={this._editSummary} label="Save changes" primary={true} /><FlatButton label="Cancel" onClick={this._editSummary}/>
              </div> : ''}
            <ListItem key="What Im doing"
                  primaryText="What I'm doing with my life ?"
                  secondaryText={this.state.life}
                  rightIconButton={<IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}> 
                    <MenuItem primaryText="Edit"  />
                  </IconMenu>}
                  leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                  style={{left: 8}}>W</Avatar>} />
            <ListItem key="Really good at"
                  primaryText="I'm really good at"
                  secondaryText={this.state.goodat}
                  rightIconButton={<IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}> 
                    <MenuItem primaryText="Edit"  />
                  </IconMenu>}
                  leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                  style={{left: 8}}>R</Avatar>} />
            <ListItem key="I spend alot"
                  primaryText="I spend a lot of time thinking about"
                  secondaryText={this.state.spendtime}
                  rightIconButton={<IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}> 
                    <MenuItem primaryText="Edit"  />
                  </IconMenu>}
                  leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                  style={{left: 8}}>I</Avatar>} />
            <ListItem key="Books food movies"
                  primaryText="Favourite Books, Movies, Food <3"
                  secondaryText={this.state.favs}
                  rightIconButton={<IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}> 
                    <MenuItem primaryText="Edit"  />
                  </IconMenu>}
                  leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                  style={{left: 8}}>F</Avatar>} />
        </List>
      </div>  
    );    
  }

});

export default About;