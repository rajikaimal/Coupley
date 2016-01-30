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

const registerStyle = {
  marginTop: 25,
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

function validatefirstname(firstname) {
  if(firstname.length >= 50) {
    return {
      "error": "Firstname is too long"
    }
  }
  else if(! /^\w+$/i.test(firstname)) {
    return {
      "error": "Firstname cannot contain special characters"
    }  
  }
  else {
    return true;
  }
}

function validatelastname(lastname) {
  if(lastname.length >= 50) {
    return {
      "error": "Lastname is too long"
    }
  }
  else if(! /^\w+$/i.test(lastname)) {
    return {
      "error": "Lastname cannot contain special characters"
    }  
  } 
  else {
    return true;
  }
}

function validateusername(username) {
  if(username.length >= 60) {
    return {
      "error": "Username is too long"
    }
  }
  else if(! /^\w+$/i.test(username)) {
    return {
      "error": "Username cannot contain special characters"
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
      "error": "Password length must be 6 or more"
    }
  }
  let re = /[0-9]/;
  if(!re.test(password)) {
    return {
      "error": "Password must contain a number"
    }
  }
  re = /[a-z]/;
  if(!re.test(password)) {
    return {
      "error": "Password must contain a lowercase letter"
    }
  }
  re = /[A-Z]/;
  if(!re.test(password)) {
    return {
      "error": "Password must contain a uppercase letter"
    }
  }
  else {
    return true;
  }
}

const Login = React.createClass({
  getInitialState: function() {
    return {
      gender: 1,
      orientation: 1
    }
  },
  _handleRegisterClickEvent: function() {
    let firstname = this.refs.firstname.getValue();
    let lastname = this.refs.lastname.getValue();
    let username = this.refs.username.getValue();
    let email = this.refs.email.getValue();
    if(this.state.gender == 1) {
      var gender = "male";  
    }
    else if(this.state.gender == 2) {
      var gender = "female";
    }
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
    var val = true;
    if(validatefirstname(firstname).error) {
      document.getElementById('firstname').innerHTML = validatefirstname(firstname).error;
      val = false;
    }
    if(validatelastname(lastname).error) {
      document.getElementById('lastname').innerHTML = validatelastname(lastname).error;
      val = false;
    }
    if(validateusername(username).error) {
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
    else {
      val = true;
    }
    let credentials = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      gender: gender,
      password: password,
      orientation: orientation
    };
    if(val) {
      RegisterActions.check(credentials);
    }
  },
  handleChangeGender: function(e, index, value){
    this.setState({gender: value});
  },
  handleChangeOrientation: function(e, index, value){
    this.setState({orientation: value});
  },
  render: function() {
    return (
      <div style={registerStyle}>
        <Paper  zDepth={2}>
        <div className="col-lg-4">
        </div>
        <div className="col-lg-2">
          
          
        </div>
        <div className="col-lg-6">
          <Card>
            <CardTitle title="Register" />
            <CardText>
              <TextField
                hintText="Firstname" hintStyle={styles.errorStyle} fullwidth={true} ref="firstname"/>
              <br />
              <span style={error} id="firstname"> </span>
              <TextField
                hintText="Lastname" hintStyle={styles.errorStyle} fullwidth={true} ref="lastname"/>
              <br />
              <span style={error} id="lastname"> </span>
              <TextField
                hintText="Username" hintStyle={styles.errorStyle} fullwidth={true} ref="username"/>
              <br />
              <span style={error} id="username"> </span>
              <TextField
                hintText="Email" hintStyle={styles.errorStyle} fullwidth={true} ref="email"/>
              <br />
              <span style={error} id="email"> </span>
              <br/>
              <label>Gender </label><DropDownMenu value={this.state.gender} onChange={this.handleChangeGender}>
                <MenuItem value={1} primaryText="Male"/>
                <MenuItem value={2} primaryText="Female"/>
              </DropDownMenu>
              <TextField
                type="password"
                hintText="Password" ref="password" hintStyle={styles.errorStyle} fullwidth={true}/>
              <br />
              <span style={error} id="password"> </span>
              <label>Sexual Orientation</label><DropDownMenu value={this.state.orientation} onChange={this.handleChangeOrientation}>
                <MenuItem value={1} primaryText="Straight"/>
                <MenuItem value={2} primaryText="Lesbian"/>
                <MenuItem value={3} primaryText="Gay"/>
                <MenuItem value={4} primaryText="Bisexual"/>
              </DropDownMenu>
                   
            </CardText>
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

export default Login;