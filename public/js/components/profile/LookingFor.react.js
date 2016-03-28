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
import AboutActions from '../../../actions/profile/AboutActions';
import AboutStore from '../../../stores/AboutStore';
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

const LookingFor = React.createClass({
  getInitialState: function() {
    return {
        editing: false,
        editingLife: false,
        editingGoodat: false,
        editingThinkingof: false,
        editingFavs: false,
        error: false,
        summary: AboutStore.getSummary(),
        life: AboutStore.getLife(),
        goodat: AboutStore.getGoodAt(),
        spendtime: AboutStore.getSpendTime(),
        favs: AboutStore.getFavs()
    };
  },
    componentDidMount: function () {
        AboutActions.fetchAll();
        AboutStore.addChangeListener(this._onChange);
        ErrorStore.addChangeListener(this._onChange);
  },
    _onChange: function () {
        this.setState({
            summary: AboutStore.getSummary(),
            life: AboutStore.getLife(),
            goodat: AboutStore.getGoodAt(),
            spendtime: AboutStore.getSpendTime(),
            favs: AboutStore.getFavs(),
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
        if(validate(this.refs.summary.getValue()).error) {
            document.getElementById('summary').innerHTML = validate(this.refs.summary.getValue()).error;
        } else {
            AboutActions.updateSummary(this.refs.summary.getValue());
            this.setState({
                editing: !this.state.editing
            });
        }
    },
    _editLife: function () {
        if(validate(this.refs.life.getValue()).error) {
            document.getElementById('life').innerHTML = validate(this.refs.life.getValue()).error;
        }
        else {
            AboutActions.updateLife(this.refs.life.getValue());
            this.setState({
                editingLife: !this.state.editingLife
            });    
        }
    },
    _editGoodat: function () {
        if(validate(this.refs.goodat.getValue()).error) {
            document.getElementById('goodat').innerHTML = validate(this.refs.goodat.getValue()).error;
        } else {
            AboutActions.updateGoodAt(this.refs.goodat.getValue());
            this.setState({
                editingGoodat: !this.state.editingGoodat
            });
        }
    },
    _editThinkingOf: function () {
        if(validate(this.refs.thinkingof.getValue()).error) {
            document.getElementById('thinkingof').innerHTML = validate(this.refs.thinkingof.getValue()).error;
        } else {
            AboutActions.updateThinkingOf(this.refs.thinkingof.getValue());
            this.setState({
                editingThinkingof: !this.state.editingThinkingof
            });
        }
    },
    _editFavs: function () {
        if(validate(this.refs.favs.getValue()).error) {
            document.getElementById('favs').innerHTML = validate(this.refs.favs.getValue()).error;
        } else {
            AboutActions.updateFavs(this.refs.favs.getValue());
            this.setState({
                editingFavs: !this.state.editingFavs
            });
        }
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
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    ref="summary"  style={textStyle} defaultValue={this.state.summary} />
                <span style={error} id="summary"> </span>
                <FlatButton onClick={this._editSummary} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._toggle}/>
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
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    ref="life"  style={textStyle} defaultValue={this.state.life} />
                <span style={error} id="life"> </span>
                <FlatButton onClick={this._editLife} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._toggleLife}/>
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
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    ref="goodat"  style={textStyle} defaultValue={this.state.goodat} />
                <span style={error} id="goodat"> </span>
                <FlatButton onClick={this._editGoodat} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._toggleGoodat}/>
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
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    ref="thinkingof"  style={textStyle} defaultValue={this.state.spendtime} />
                <span style={error} id="spendtime"> </span>
                <FlatButton onClick={this._editThinkingOf} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._editThinkingOf}/>
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
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    ref="favs"  style={textStyle} defaultValue={this.state.favs} />
                <span style={error} id="favs"> </span>
                <FlatButton onClick={this._editFavs} label="Save changes" primary={true} />
                <FlatButton label="Cancel" onClick={this._editFavs}/>
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

export default LookingFor;