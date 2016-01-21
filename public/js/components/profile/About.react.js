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

const details = [{
  "summary": "Summary of myself",
  "Age": "Hello !"
}, {
  "summary": "What Im doing ?",
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

const About = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  _toggleEdit: function(key) {
    this.state.editing ? this.setState({editing: false}) : this.setState({editing: true});
  },
  _generateListItem: function() {
    return details.map((item) => {
      return (<ListItem key={item.summary}
                  primaryText={item.summary}
                  onClick={this._toggleEdit.bind(this,item.summary)}
                  secondaryText={item.Age} 
                  leftAvatar={<Avatar color={Colors.pinkA200} backgroundColor={Colors.transparent}
                  style={{left: 8}}>{item.summary.substring(0,1)}</Avatar>} />);
    });
  },
  render: function() {
    return (
      <div>        
        <List>
            {this._generateListItem()}
        </List>
      </div>  
    );    
  }

});

export default About;