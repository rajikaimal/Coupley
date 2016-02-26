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
import ErrorStore from '../../stores/ErrorStore';
import Snackbar from 'material-ui/lib/snackbar';

//tap-event-plugin
injectTapEventPlugin();

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
        AboutActions.fetchAll();
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
    _toggle: function () {
        this.setState({
            editing: !this.state.editing
        });
    },
    _toggleLife: function () {
        this.setState({
            editingLife: !this.state.editingLife
        });
    },
    _toggleGoodat: function () {
        this.setState({
            editingGoodat: !this.state.editingGoodat
        });
    },
    _toggleThinkingof: function () {
        this.setState({
            editingThinkingof: !this.state.editingThinkingof
        });
    },
    _toggleFavs: function () {
        this.setState({
            editingFavs: !this.state.editingFavs
        });
    },
    _editSummary: function () {
        AboutActions.updatesummary(this.refs.summary.getValue());
        this.setState({
            editing: !this.state.editing
        });
    },
    _editLife: function () {
        AboutActions.updatelife(this.refs.life.getValue());
        this.setState({
            editingLife: !this.state.editingLife
        });
    },
    _editGoodat: function () {
        AboutActions.updategoodat(this.refs.goodat.getValue());
        this.setState({
            editingGoodat: !this.state.editingGoodat
        });
    },
    _editThinkingOf: function () {
        AboutActions.updatethinkingof(this.refs.thinkingof.getValue());
        this.setState({
            editingThinkingof: !this.state.editingThinkingof
        });
    },
    _editFavs: function () {
        AboutActions.updatefavs(this.refs.favs.getValue());
        this.setState({
            editingFavs: !this.state.editingFavs
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
                    <MoreVertIcon />
                </IconButton>}>
                    <MenuItem onTouchTap={this._toggle} primaryText="Edit"  />
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>S</Avatar>} />
            {this.state.editing ? <div>
                <TextField
                    ref="summary"  style={textStyle} defaultValue={this.state.summary} />
                <FlatButton onClick={this._editSummary} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._editSummary}/>
            </div> : ''}
            <ListItem key="What Im doing"
                primaryText="What I'm doing with my life ?"
                secondaryText={this.state.life}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    <MoreVertIcon />
                </IconButton>}>
                    <MenuItem onTouchTap={this._toggleLife} primaryText="Edit"  />
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>W</Avatar>} />
            {this.state.editingLife ? <div>
                <TextField
                    ref="life"  style={textStyle} defaultValue={this.state.life} />
                <FlatButton onClick={this._editLife} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._editSummary}/>
            </div> : ''}
            <ListItem key="Really good at"
                primaryText="I'm really good at"
                secondaryText={this.state.goodat}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    <MoreVertIcon />
                </IconButton>}>
                    <MenuItem onTouchTap={this._toggleGoodat} primaryText="Edit"  />
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>R</Avatar>} />
            {this.state.editingGoodat ? <div>
                <TextField
                    ref="goodat"  style={textStyle} defaultValue={this.state.goodat} />
                <FlatButton onClick={this._editGoodat} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._editSummary}/>
            </div> : ''}
            <ListItem key="I spend alot"
                primaryText="I spend a lot of time thinking about"
                secondaryText={this.state.spendtime}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    <MoreVertIcon />
                </IconButton>}>
                    <MenuItem onTouchTap={this._toggleThinkingof} primaryText="Edit"  />
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>I</Avatar>} />
            {this.state.editingThinkingof ? <div>
                <TextField
                    ref="thinkingof"  style={textStyle} defaultValue={this.state.spendtime} />
                <FlatButton onClick={this._editThinkingOf} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._editSummary}/>
            </div> : ''}
            <ListItem key="Books food movies"
                primaryText="Favourite Books, Movies, Food <3"
                secondaryText={this.state.favs}
                rightIconButton={<IconMenu iconButtonElement={<IconButton>
                    <MoreVertIcon />
                </IconButton>}>
                    <MenuItem onTouchTap={this._toggleFavs} primaryText="Edit"  />
                </IconMenu>}
                leftAvatar={<Avatar color={Colors.deepPurple500} backgroundColor={Colors.transparent}
                    style={{left: 8}}>F</Avatar>} />
            {this.state.editingFavs ? <div>
                <TextField
                    ref="favs"  style={textStyle} defaultValue={this.state.favs} />
                <FlatButton onClick={this._editFavs} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._editSummary}/>
            </div> : ''}
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