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
import Countries from '../register/countries.js';
import UpdateAccActions from '../../actions/RegisterActions';
import UpdateInfo from '../../actions/profile/UpdateInfo';
import ProfileActions from '../../actions/profile/ProfileActions';
import ProfileStore from '../../stores/ProfileStore';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

const buttonStyle = {
  marginTop: 25
}

const styles = {
  errorStyle: {
      color: Colors.lightBlue500,
  }
};

const error = {
    color: Colors.red500
};

var year = new Date();
var currentYear = year.getFullYear();
year.setFullYear(currentYear - 18);

var minYear = new Date();
minYear.setFullYear(currentYear - 100);


// function validateusername(username) {
//   let re = /[0-9]/;
//   if (username.length >= 50) {
//     return {
//       "error": "*username is too long"
//     }
//   }
//   else if(username === "") {
//     return {
//       "error": "*username cannot be empty"
//     }
//   }
//   else if (!/^\w+$/i.test(username)) {
//     return {
//       "error": "*invalid username"
//     }  
//   }
//   else if(re.test(username)) {
//     return {
//       "error": "*invalid username"
//     }
//   }
//   else {
//     return true;
//   }
// }

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  if(re.test(email)) {
    return true;
  }
  else {
    return false;
  }
}

const Register = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      gender: 0,
      orientation: 0,
      password: '',
      birthday: '',
    }
  },
  componentDidMount: function() {
    ProfileActions.getProfileData(localStorage.getItem('email'));
    ProfileStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    var data = ProfileStore.getUserData();
    var gender;
    if(data.gender == "male") {
      gender = 1;
    }
    else {
      gender = 2;
    }
    var orientation;
    if(data.orientation == "straight") {
      orientation = 1;
    }
    else if(data.orientation == "lesbian") {
      orientation = 2;
    }
    else if(data.orientation == "gay") {
      orientation = 3;
    }
    else if(data.orientation == "bisexual") {
      orientation = 4;
    }
    this.setState({
      email: localStorage.getItem('email'),
      gender: gender,
      orientation: orientation,
      birthday: data.birthday,
    });
  },
  _handleSubmitEvent: function() {
    //let username = this.refs.username.getValue();
    let email = this.refs.email.getValue();
    if(email == "" || email == null) {
      email = this.state.email;
    }
    if(this.state.gender == 1) {
      var gender = "male";  
    }
    else if(this.state.gender == 2) {
      var gender = "female";
    }
    if(this.state.orientation == 1) {
      var orientation = "straight";
    }
    else if(this.state.orientation == 2) {
      var orientation = "lesbian";
    }
    else if(this.state.orientation == 3) {
      var orientation = "gay";
    }
    else if(this.state.orientation == 4) {
      var orientation = "bisexual";
    }
    var val = true;
    // if (validateusername(username).error) {
    //   document.getElementById('username').innerHTML = validateusername(username).error;
    //   val = false;
    // }
    if(! validateEmail(email)) {
      document.getElementById('email').innerHTML = '*invalid Email !';
      val = false;
      return false;
    }
    if(document.getElementById('email').innerText  != "") {
      val = false;
      return false;
    }
    if(this.state.orientation == 0) {
      val = false;
      document.getElementById('orientation').innerHTML = "*select an option";
      return false;
    }
    if(this.state.gender == 0) {
      val = false;
      document.getElementById('gender').innerHTML = "*select an option";
      return false;
    }
    else {
      val = true;
    }
    let credentials = {
      username: localStorage.getItem('username'),
      email: email,
      gender: gender,
      birthday: this.state.birthday,
      orientation: orientation
    };
    if (val) {
      UpdateInfo.update(credentials);
    }
  },
  handleChangeGender: function(e, index, value){
    this.setState({gender: value});
  },
  handleChangeOrientation: function(e, index, value){
    this.setState({orientation: value});
  },
  // _checkUsername: function() {
  //   let username = this.refs.username.getValue();
  //   if(validateusername(username).error) {
  //       document.getElementById('username').innerHTML = validateusername(username).error;
  //   }
  //   UpdateAccActions.checkUsername(username);
  // },
  _checkEmail: function() {
    let email = this.refs.email.getValue();
    if(!validateEmail(email)) {
        document.getElementById('email').innerHTML = "*invalid email";
    }
    else {
        UpdateAccActions.checkEmail(email);
    }
  },
  _getDate: function(event, value) {
    let birthday = value.getFullYear() + '-' + value.getMonth() + '-' + value.getDate();
    //window.birthday = birthday.toString();
    this.setState({
      birthday: birthday.toString()
    })
  },
  _handleCancel: function() {
    window.location = "/#/profile/activityfeed";
  },
  render: function() {
    return (
      <div>
        <Paper zDepth={2}>
        <div>
          <Card>
            <CardTitle title="Account details" />
            <Table>
              <TableBody displayRowCheckbox={false}>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Email</TableRowColumn>
                <TableRowColumn> 
                  <TextField onKeyUp={this._checkEmail}
                    hintText={this.state.email} hintStyle={styles.errorStyle} fullwidth={true} ref="email"/>
              
                <br/><span style={error} id="email"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Birthday</TableRowColumn>
                <TableRowColumn>
                  {this.state.birthday}
                  <DatePicker minDate={minYear} maxDate={year} hintStyle={styles.errorStyle} hintText="change your birthday" onChange={this._getDate}/>
                  <br/><span style={error} id="birthday"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}> 
                <TableRowColumn>Gender</TableRowColumn>
                <TableRowColumn> 
                  <DropDownMenu value={this.state.gender} onChange={this.handleChangeGender}>
                  <MenuItem value={1} primaryText="Male"/>
                  <MenuItem value={2} primaryText="Female"/>
                </DropDownMenu>
                <br/><span style={error} id="gender"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Sexual orientation</TableRowColumn>
                <TableRowColumn> 
                  <DropDownMenu value={this.state.orientation} onChange={this.handleChangeOrientation}>
                    <MenuItem value={1} primaryText="Straight"/>
                    <MenuItem value={2} primaryText="Lesbian"/>
                    <MenuItem value={3} primaryText="Gay"/>
                    <MenuItem value={4} primaryText="Bisexual"/>
                  </DropDownMenu>
                  <br/><span style={error} id="orientation"> </span>
                </TableRowColumn>
              </TableRow>
              </TableBody>
            <CardText>
            </CardText>
            </Table>
            <CardActions>
              <RaisedButton label="Save changes" style={buttonStyle} primary={true} onTouchTap={this._handleSubmitEvent} />
              <RaisedButton label="Cancel" style={buttonStyle} onTouchTap={this._handleCancel} />
            </CardActions>
              <span style={error} id="serverstatus"> </span>
          </Card>  
        </div>
        </Paper>     
      </div>
    );    
  }

});

export default Register;