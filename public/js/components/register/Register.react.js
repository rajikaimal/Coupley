import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RegisterActions from '../../actions/RegisterActions';
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
import Countries from './countries.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

const registerStyle = {
  marginLeft: 500
};

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

function validatefirstname(firstname) {
  if(firstname.length >= 50) {
    return {
      "error": "*firstname is too long"
    }
  }
  else if(firstname === "") {
    return {
      "error": "*firstname cannot be empty"
    }
  }
  else if(! /^\w+$/i.test(firstname)) {
    return {
      "error": "*invalid firstname"
    }  
  }
  else if(firstname.match(/\d+/g)) {
    return {
      "error": "*cannot contain numbers"
    }  
  }
  else {
    return true;
  }
}

function validatelastname(lastname) {
    if (lastname.length >= 50) {
    return {
      "error": "*lastname is too long"
    }
  }
  else if(lastname === "") {
    return {
      "error": "*lastname cannot be empty"
    }
  }
  else if(! /^\w+$/i.test(lastname)) {
    return {
      "error": "*invalid lastname"
    }  
  }
  else if(lastname.match(/\d+/g)) {
    return {
      "error": "*cannot contain numbers"
    }  
  }
  else {
    return true;
  }
}

function validateusername(username) {
  let re = /[0-9]/;
  if (username.length >= 50) {
    return {
      "error": "*username is too long"
    }
  }
  else if(username === "") {
    return {
      "error": "*username cannot be empty"
    }
  }
  else if (!/^\w+$/i.test(username)) {
    return {
      "error": "*invalid username"
    }  
  }
  else if(re.test(username)) {
    return {
      "error": "*invalid username"
    }
  }
  else {
    return true;
  }
}

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  if(re.test(email)) {
    return true;
  }
  else {
    return false;
  }
}

function validatePassword(password) {
  if(password.length < 6) {
    return {
      "error": "*password length <br/> must be 6 or more"
    }
  }
  let re = /[0-9]/;
  if(!re.test(password)) {
    return {
      "error": "*password must <br/> contain a number"
    }
  }
  re = /[a-z]/;
  if(!re.test(password)) {
    return {
      "error": "*password must <br/> contain a lowercase letter"
    }
  }
  re = /[A-Z]/;
  if(!re.test(password)) {
    return {
      "error": "*password must <br/> contain a uppercase letter"
    }
  }
  else {
    return true;
  }
}

const Register = React.createClass({
  getInitialState: function() {
    document.body.style.background = 'url(/img/register.jpg)';
    return {
      gender: 0,
      orientation: 0,
      country: 0
    }
  },
  componentDidMount: function() {
    year = new Date().setFullYear(2010);
  },
  _handleRegisterClickEvent: function() {
    let firstname = this.refs.firstname.getValue();
    let lastname = this.refs.lastname.getValue();
    let username = this.refs.username.getValue();
    let email = this.refs.email.getValue();
    alert(window.birthday);
    let password = this.refs.password.getValue();
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
    let country = this.state.country;
    var val = true;
    if(validatefirstname(firstname).error) {
      document.getElementById('firstname').innerHTML = validatefirstname(firstname).error;
      val = false;
    }
    if(validatelastname(lastname).error) {
      document.getElementById('lastname').innerHTML = validatelastname(lastname).error;
      val = false;
    }
    if (validateusername(username).error) {
      document.getElementById('username').innerHTML = validateusername(username).error;
      val = false;
    }
    if(! validateEmail(email)) {
      document.getElementById('email').innerHTML = 'Invalid Email !';
      val = false;
    }
    if(validatePassword(password).error) {
      document.getElementById('password').innerHTML = validatePassword(password).error; 
      val = false;
    }
    if(this.state.country == 0) {
      val = false;
      document.getElementById('country').innerHTML = "*select an option";
    }
    if(this.state.orientation == 0) {
      val = false;
      document.getElementById('orientation').innerHTML = "*select an option";
    }
    if(this.state.gender == 0) {
      val = false;
      document.getElementById('gender').innerHTML = "*select an option";
    }
    else {
      val = true;
    }

    if(this.state.gender == 1) {
      var gender = "male";  
    }
    else if(this.state.gender == 2) {
      var gender = "female";
    }
    else {
      return false;
    }

    let credentials = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      gender: gender,
      password: password,
      country: country,
      birthday: window.birthday,
      orientation: orientation
    };

    if (val) {
      
      RegisterActions.check(credentials);
    }
  },
  handleChangeGender: function(e, index, value){
    this.setState({gender: value});
  },
  handleChangeOrientation: function(e, index, value){
    this.setState({orientation: value});
  },
  handleChangeCountry: function(e, index, value) {
    this.setState({country: value});
  },
  _checkFullname: function() {
    let firstname = this.refs.firstname.getValue();
    if(validatefirstname(firstname).error) {
        document.getElementById('firstname').innerHTML = validatefirstname(firstname).error;
    }
    else {
        document.getElementById('firstname').innerHTML = "";
    }
  },
  _checkLastname: function() {
    let lastname = this.refs.lastname.getValue();
    if(validatelastname(lastname).error) {
        document.getElementById('lastname').innerHTML = validatelastname(lastname).error;
    }
    else {
        document.getElementById('lastname').innerHTML = "";
    }
  },
  _checkUsername: function() {
    let username = this.refs.username.getValue();
    if(validateusername(username).error) {
        document.getElementById('username').innerHTML = validateusername(username).error;
    }
    RegisterActions.checkUsername(username);
  },
  _checkEmail: function() {
    let email = this.refs.email.getValue();
    if(!validateEmail(email)) {
        document.getElementById('email').innerHTML = "*invalid email";
    }
    else {
        RegisterActions.checkEmail(email);
    }
  },
  _getDate: function(event, value) {
    let birthday = value.getFullYear() + '-' + value.getMonth() + '-' + value.getDate();
    window.birthday = birthday.toString();
  },
  render: function() {
    return (
      <div style={registerStyle}>
        <Paper  zDepth={2}>
        <div className="col-xs-6 col-sm-6 col-md-7 col-md-offset-5 col-lg-7 col-lg-offset-5">
          <Card>
            <CardTitle title="Register" />
            <Table>
              <TableBody displayRowCheckbox={false}>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Fullname</TableRowColumn>
                <TableRowColumn hoverable={false}> 
                  <TextField onKeyUp={this._checkFullname}
                  floatingLabelText="Firstname" hintStyle={styles.errorStyle} fullwidth={true} ref="firstname"/>
                  <br/><span style={error} id="firstname"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Lastname</TableRowColumn>
                <TableRowColumn> 
                  <TextField onKeyUp={this._checkLastname}
                floatingLabelText="Lastname" hintStyle={styles.errorStyle} fullwidth={true} ref="lastname"/>
                <br/><span style={error} id="lastname"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Username</TableRowColumn>
                <TableRowColumn> 
                  <TextField onKeyUp={this._checkUsername}
                floatingLabelText="Username" hintStyle={styles.errorStyle} fullwidth={true} ref="username"/>
                <br/><span style={error} id="username"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Email</TableRowColumn>
                <TableRowColumn> 
                  <TextField onKeyUp={this._checkEmail}
                floatingLabelText="Email" hintStyle={styles.errorStyle} fullwidth={true} ref="email"/>
              
                <br/><span style={error} id="email"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Birthday</TableRowColumn>
                <TableRowColumn> 
                  <DatePicker minDate={minYear} maxDate={year} hintText="select your birthday" onChange={this._getDate}/>
                  <br/><span style={error} id="birthday"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}> 
                <TableRowColumn>Gender</TableRowColumn>
                <TableRowColumn> 
                  <DropDownMenu value={this.state.gender} onChange={this.handleChangeGender}>
                  <MenuItem value={0} primaryText="Select value"/>
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
                    <MenuItem value={0} primaryText="Select value"/>
                    <MenuItem value={1} primaryText="Straight"/>
                    <MenuItem value={2} primaryText="Lesbian"/>
                    <MenuItem value={3} primaryText="Gay"/>
                    <MenuItem value={4} primaryText="Bisexual"/>
                  </DropDownMenu>
                  <br/><span style={error} id="orientation"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Country</TableRowColumn>
                <TableRowColumn> 
                <DropDownMenu value={this.state.country} onChange={this.handleChangeCountry}>
                  <MenuItem value={0} primaryText="Select value"/>
                {
                  Countries.map((cntry) => {
                    return (<MenuItem value={cntry.code} primaryText={cntry.name}/>);    
                  })
                }
                
               </DropDownMenu>
               <br/><span style={error} id="country"> </span>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Password</TableRowColumn>
                <TableRowColumn> 
                  <TextField onKeyUp={this._checkPassword}
                  type="password"
                  floatingLabelText="Password" ref="password" hintStyle={styles.errorStyle} fullwidth={true}/>
                
                  <br/><span style={error} id="password"> </span>
                </TableRowColumn>
              </TableRow>
              </TableBody>
            <CardText>                

                   
            </CardText>
            </Table>
            <CardActions>
              <RaisedButton label="Register" style={buttonStyle} primary={true} onTouchTap={this._handleRegisterClickEvent} />
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