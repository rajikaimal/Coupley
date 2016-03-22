import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import CardTitle from 'material-ui/lib/card/card-title';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Table from 'material-ui/lib/table/table';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Colors from 'material-ui/lib/styles/colors';
import Countries from '../../register/countries.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import AboutActions from '../../../actions/profile/AboutActions';
import AboutStore from '../../../stores/AboutStore';
import ErrorStore from '../../../stores/ErrorStore';
import Snackbar from 'material-ui/lib/snackbar';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import Checkbox from 'material-ui/lib/checkbox';

//tap-event-plugin
injectTapEventPlugin();

const buttonStyle = {
  marginTop: 25
}

const listStyle = {
    marginBottom: 30
}

const styles = {
  errorStyle: {
      color: Colors.lightBlue500,
  },  
  checkbox: {

  },
};

const ageStyle = {
    width: 120
}

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
    handleChangeGender: function(e, index, value){
        this.setState({gender: value});
    },
    _handleLocationChange: function(e, value) {
        this.setState({
            location: value
        });
    },
    _handleStatusChange: function(e, value) {
        this.setState({
            status: value
        });
    },
    _handleShortChange: function(e, value) {
        this.setState({
            shortFor: value
        });
    },
    _handleLongChange: function(e, value) {
        this.setState({
            longFor: value
        });
    },
    _handleSxChange: function(e, value) {
        this.setState({
            sxFor: value
        });
    },
  render: function() {
    return (
      <div>      
        <Paper zDepth={2}>
        <div>
          <Card>
            <CardTitle title="Looking for" />
                <button onClick={this._toggle}> edit </button>
                <ul>
                    { this.state.editing ? 

                        <Table>
                          <TableBody displayRowCheckbox={false}>
                          <TableRow hoverable={false} hovered={false} selectable={false}> 
                            <TableRowColumn>Gender</TableRowColumn>
                            <TableRowColumn> 
                              <DropDownMenu value={this.state.gender} onChange={this.handleChangeGender}>
                              <MenuItem value={1} primaryText="Men"/>
                              <MenuItem value={2} primaryText="Women"/>
                            </DropDownMenu>
                            <br/><span style={error} id="gender"> </span>
                            </TableRowColumn>
                          </TableRow>
                          <TableRow hoverable={false} hovered={false} selectable={false}>
                            <TableRowColumn>Location</TableRowColumn>
                            <TableRowColumn>
                                <Checkbox
                                        onCheck={this._handleLocationChange}
                                        label="Near you"
                                        style={styles.checkbox}
                                />
                            </TableRowColumn>
                          </TableRow>
                          <TableRow hoverable={false} hovered={false} selectable={false}>
                            <TableRowColumn>Age</TableRowColumn>
                            <TableRowColumn> 
                              <TextField 
                                value={this.state.email} style={ageStyle} hintStyle={styles.errorStyle} fullwidth={true} ref="email"/>
                          
                            <br/><span style={error} id="email"> </span>
                            </TableRowColumn>
                          </TableRow>
                          <TableRow hoverable={false} hovered={false} selectable={false}>
                            <TableRowColumn>Relationship Status</TableRowColumn>
                            <TableRowColumn> 
                              <Checkbox
                                  onCheck={this._handleStatusChange}
                                  label="Must be single"
                                  style={styles.checkbox}
                                />
                              <br/><span style={error} id="orientation"> </span>
                            </TableRowColumn>
                          </TableRow>
                          <TableRow hoverable={false} hovered={false} selectable={false}>
                            <TableRowColumn>For</TableRowColumn>
                            <TableRowColumn> 
                              <Checkbox
                                  onCheck={this._handleShortChange}
                                  label="Short term relationship"
                                  style={styles.checkbox}
                                />
                              <Checkbox
                                  onCheck={this._handleLongChange}
                                  label="Long term relationship"
                                  style={styles.checkbox}
                                />
                              <Checkbox
                                  onCheck={this._handleSxChange}
                                  label="Casual sex"
                                  style={styles.checkbox}
                                />
                              <br/><span style={error} id="orientation"> </span>
                            </TableRowColumn>
                          </TableRow>
                          </TableBody>
                        <CardText>
                        </CardText>
                        </Table>


                    : 
                     <div>
                        <li style={listStyle}> 
                        adad
                        
                        </li>
                        <li style={listStyle}> 
                            adad

                        </li>
                        <li style={listStyle}> Age 18-50 </li>
                        <li style={listStyle}> Who are single</li>
                        <li style={listStyle}> Friends, short term dating, for casual sex </li>
                     </div>

                    }
                    
                </ul>
          </Card>  
        </div>
        </Paper>   
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