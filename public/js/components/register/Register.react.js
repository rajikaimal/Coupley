import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RegisterActions from '../../actions/RegisterActions';
import Paper from 'material-ui/lib/paper';

const registerStyle = {
  marginTop: 50,
  marginLeft: 500
};

const buttonStyle = {
  marginTop: 25
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
    let credentials = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      gender: gender,
      password: password,
      orientation: orientation
    };
    RegisterActions.check(credentials);
    console.log('Done calling !');
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
        <div className="col-lg-4">
          <TextField
            floatingLabelText="firstname" ref="firstname"/>
          <br/>
          <TextField
            floatingLabelText="lastname" ref="lastname"/>
          <br/>
          <TextField
            floatingLabelText="username" ref="username"/>
          <br />
          <TextField
            floatingLabelText="email" ref="email"/>
          <br/>
          <DropDownMenu value={this.state.gender} onChange={this.handleChangeGender}>
            <MenuItem value={1} primaryText="Male"/>
            <MenuItem value={2} primaryText="Female"/>
          </DropDownMenu>
          <TextField
            type="password"
            floatingLabelText="password" ref="password"/>
          <br/>
          <DropDownMenu value={this.state.orientation} onChange={this.handleChangeOrientation}>
            <MenuItem value={1} primaryText="Straight"/>
            <MenuItem value={2} primaryText="Lesbian"/>
            <MenuItem value={3} primaryText="Gay"/>
            <MenuItem value={4} primaryText="Bisexual"/>
          </DropDownMenu>
          <br/>
          <RaisedButton label="Register" style={buttonStyle} primary={true} onTouchTap={this._handleRegisterClickEvent} />
        </div>
        <div className="col-lg-4">
        </div>
        </Paper>
      </div>
    );
  }

});

export default Login;
