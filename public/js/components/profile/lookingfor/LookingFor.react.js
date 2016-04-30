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

const editStyle = {
  float: 'right'
};

const ageStyle = {
  width: 50
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
        location: true,
        mustBeSingle: true,
        shortTerm: true,
        longTerm: true,
        casualSex: true,
        nearYouShow: "",
        minAgeShow: 0,
        maxAgeShow: 0,
        relStatusShow: "",
        shortTermShow: "",
        longTermShow: "",
        casualSexShow: ""
    };
  },
  componentDidMount: function () {
    AboutActions.fetchLookingFor();
    AboutStore.addChangeListener(this._onChange);
    ErrorStore.addChangeListener(this._onChange);
  },
  _onChange: function () {
    if(AboutStore.getLookingFor().location == 0) {
      this.setState({
        nearYouShow: "Anywhere",
        location: false
      });
    }
    else {
      this.setState({
        nearYouShow: "Near me",
        location: true
      }); 
    }
    if(AboutStore.getLookingFor().status == 1) {
      this.setState({
        relStatusShow: "Must be Single",
        mustBeSingle: true
      });
    }
    else {
      this.setState({
        relStatusShow: "Doesn't care about relationship status",
        mustBeSingle: false
      });
    }
    if(AboutStore.getLookingFor().shortterm == 1) {
      this.setState({
        shortTermShow: "Looking for short term relationship",
        shortTerm: true
      });
    }
    else {
      this.setState({
        shortTermShow: "Not looking for short term relationship",
        shortTerm: false
      }); 
    }
    if(AboutStore.getLookingFor().longtterm == 1) {
      this.setState({
        longTermShow: "Looking for long term relationship",
        longTerm: true
      });
    }
    else {
      this.setState({
        longTermShow: "Not looking for long term relationship",
        longTerm: false
      }); 
    }
    if(AboutStore.getLookingFor().casualSex == 1) {
      this.setState({
        casualSexShow: "For casual sex",
        casualSex: true
      });
    }
    else {
      this.setState({
        casualSexShow: "No casual sex",
        casualSex: false
      });  
    }

    this.setState({
        summary: AboutStore.getSummary(),
        life: AboutStore.getLife(),
        goodat: AboutStore.getGoodAt(),
        spendtime: AboutStore.getSpendTime(),
        favs: AboutStore.getFavs(),
        error: ErrorStore.getabouterr(),
        minAgeShow: AboutStore.getLookingFor().minage,
        maxAgeShow: AboutStore.getLookingFor().maxage
    });
  },
    _toggle: function () {
        this.setState({
            editing: !this.state.editing
        });
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
            mustBeSingle: value
        });
    },
    _handleShortChange: function(e, value) {
        this.setState({
            shortTerm: value
        });
    },
    _handleLongChange: function(e, value) {
        this.setState({
            longTerm: value
        });
    },
    _handleSxChange: function(e, value) {
        this.setState({
            casualSex: value
        });
    },
    _handleCancel: function() {
      this.setState({
        editing: false
      });
    },
    _handleSubmit: function() {
      let minAge = this.refs.minAge.getValue();
      let maxAge = this.refs.maxAge.getValue();
      if(minAge == "") {
        minAge = this.state.minAgeShow;
      }
      if(maxAge == "") {
        maxAge = this.state.maxAgeShow; 
      }

      if(minAge > maxAge) {
        document.getElementById('serverstatus').innerHTML = "*invalid age selection";
        return false;
      }

      let lookingFor = {
        location: this.state.location,
        minage: minAge,
        maxage: maxAge,
        relstatus: this.state.mustBeSingle,
        shortterm: this.state.shortTerm,
        longterm: this.state.longTerm,
        casualsex: this.state.casualSex
      };

      AboutActions.updateLookingFor(lookingFor);
      this.setState({
        editing: false
      });
    },
  render: function() {
    return (
      <div>      
        <Paper zDepth={2}>
        <div>
          <Card>
            <CardTitle title="Looking for" />
                { this.state.editing ? '' : <button style={editStyle} onClick={this._toggle}> edit </button> }
                <ul>
                    { this.state.editing ? 
                        <div>
                        <Table>
                          <TableBody displayRowCheckbox={false}>
                          <TableRow hoverable={false} hovered={false} selectable={false}>
                            <TableRowColumn>Location</TableRowColumn>
                            <TableRowColumn>
                                <Checkbox
                                        checked={this.state.location}
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
                                hintText={this.state.minAgeShow} style={ageStyle} hintStyle={styles.errorStyle} fullwidth={true} ref="minAge" type="number" min="18" max="99" />
                              to 
                               <TextField 
                                hintText={this.state.maxAgeShow} style={ageStyle} hintStyle={styles.errorStyle} fullwidth={true} ref="maxAge" type="number" min="18" max="99" />
                            <br/><span style={error} id="email"> </span>
                            </TableRowColumn>
                          </TableRow>
                          <TableRow hoverable={false} hovered={false} selectable={false}>
                            <TableRowColumn>Relationship Status</TableRowColumn>
                            <TableRowColumn> 
                              <Checkbox
                                  checked={this.state.mustBeSingle}
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
                                  checked={this.state.shortTerm}
                                  onCheck={this._handleShortChange}
                                  label="Short term relationship"
                                  style={styles.checkbox}
                                />
                              <Checkbox
                                  checked={this.state.longTerm}
                                  onCheck={this._handleLongChange}
                                  label="Long term relationship"
                                  style={styles.checkbox}
                                />
                              <Checkbox
                                  checked={this.state.casualSex}
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
                        <div>
                          <CardActions>
                            <RaisedButton label="Save changes" style={buttonStyle} onTouchTap={this._handleSubmit} />
                            <RaisedButton label="Cancel" style={buttonStyle} onTouchTap={this._handleCancel} />
                          </CardActions>
                            <span style={error} id="serverstatus"> </span>
                        </div>
                        </div>
                    : 
                     <div>
                        <li style={listStyle}> 
                          {this.state.nearYouShow}
                        </li>
                        <li style={listStyle}> 
                          {this.state.minAgeShow} - {this.state.maxAgeShow}
                        </li>
                        <li style={listStyle}>{this.state.relStatusShow}</li>
                        <li style={listStyle}>{this.state.shortTermShow}, {this.state.longTermShow}, {this.state.casualSexShow}</li>
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