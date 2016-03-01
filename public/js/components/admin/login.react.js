/**
 * Created by Isuru 1 on 24/01/2016.
 */
import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import LoginActions from '../../actions/admin/LoginActions';
import LoginStore from '../../stores/admin/LoginStore';

const err = { color: 'red' };
var validEmail = /\S+@\S+\.\S+/;

const Adminlogin = React.createClass({
  getInitialState: function () {
    console.log(LoginStore.getState());
    return {
      apitoken: LoginStore.getState(),
    };
  },

  componentDidMount: function () {
    LoginStore.addChangeListener(this._onChange);
    if (this.state.apitoken) {
      document.location = '/cp-admin#/cards';
    } else {
      document.location = '/cp-admin#/AdminLogin';
    }
  },

  _onChange: function () {
    this.setState({ apitoken: LoginStore.getState() });
    if (this.state.apitoken) {
      document.location = '/cp-admin#/cards';
    } else {
      document.location = '/cp-admin#/AdminLogin';
    }
  },

  _handleLogin: function () {
    let email = this.refs.email.getValue();
    let password = this.refs.password.getValue();
    let credentials = {
      email: email,
      password: password,
    };
    LoginActions.login(credentials);
    localStorage.setItem('emails', email);
    console.log('Done calling!');

    if (email.trim() == '') {
      document.getElementById('email').innerHTML = '*Email field is empty, Please enter the email!';
      document.getElementById('password').innerHTML = '';
      this.refs.email.focus();
      return false;
    } else if (password.trim() == '') {
      document.getElementById('password').innerHTML = '*Password field is empty, Please enter the password!';
      document.getElementById('email').innerHTML = '';
      this.refs.password.focus();
      return false;
    } else {
      if (!email.match(validEmail)) {
        document.getElementById('password').innerHTML = '';
        document.getElementById('email').innerHTML = '*Email is invalid, Please enter a correct email!';
        this.refs.email.focus();
      } else {
        document.getElementById('email').innerHTML = '';
        document.getElementById('password').innerHTML = '';
      }
    }
  },

  eleminateErrors:function () {
    document.getElementById('server-error').innerHTML = ' ';
  },

  render: function () {
    return (
      <div>
        <div className="container">
          <div className="col-lg-6 col-lg-offset-3 text-center">
            <Card style={ { marginTop: 60 } }>
              <CardTitle title="Welcome Back.." subtitle="Coupley &trade;"/>
              <CardText onFocus={this.eleminateErrors}>
              <CardActions>
                <TextField
                  floatingLabelText="Enter your email" ref="email" />
                <div style={err} id="email" onChange={this._handleLogin}></div>
                <TextField
                  floatingLabelText="Enter your password" ref="password" type="password" />
                <div id="password" style={err} onChange={this._handleLogin}></div>
              </CardActions>
                <span id="server-error" style={err}> </span>
                <br/>
                <RaisedButton label="Signin"  primary={true} onTouchTap={this._handleLogin} />
                <a href="/cp-admin#/Adminforgotpwd"> Forgot password ? </a>
              </CardText>
            </Card>
          </div>
        </div>
      </div>
    );
  },

});

export default Adminlogin;
