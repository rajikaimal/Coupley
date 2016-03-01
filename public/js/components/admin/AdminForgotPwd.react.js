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
import LoginStore from '../../stores/LoginStore';

const err = { color: 'red' };
var validEmail = /\S+@\S+\.\S+/;

const AdminForgot = React.createClass({
  sendemail: function () {
    let email = this.refs.email.getValue();
    let resetemail = {
      email: email,
    };
    LoginActions.resetpassword(resetemail);

    if (email.trim() == '') {
      document.getElementById('email').innerHTML = '*Email field is empty, Please enter the email!';
      this.refs.email.focus();
      return false;
    } else {
      if (!email.match(validEmail)) {
        document.getElementById('email').innerHTML = '*Email is invalid, Please enter a correct email!';
        this.refs.email.focus();
        return false;
      } else {
        document.getElementById('email').innerHTML = '';
      }
    }
  },

  eleminateErrors:function () {
    document.getElementById('email').innerHTML = ' ';
  },

  render: function () {
    return (
      <div>
        <div className="container">
          <div className="col-lg-6 col-lg-offset-3 text-center">
            <Card style={ { marginTop: 60 } }>
              <CardTitle title="Welcome Back.." subtitle="Coupley &trade;"/>
              <CardActions>
                <TextField onChange={this.eleminateErrors}
                  floatingLabelText="Enter your email" ref="email" />
                <div style={err} id="email" onChange={this.sendemail}></div>
              </CardActions>
              <CardText>
                <span id="server-error" style={err}> </span>
                <br/>
                <RaisedButton label="Ok"  primary={true} onTouchTap={this.sendemail} />
                <a href="/cp-admin#/AdminLogin"> Back to Login </a>
              </CardText>
            </Card>
          </div>
        </div>
      </div>
    );
  },

});

export default AdminForgot;
