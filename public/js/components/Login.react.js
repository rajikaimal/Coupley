import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './customtheme';
import Header from './base/Header.react';

const Login = React.createClass({
  render () {
    return (
      <div className="container container-tab">
      <Header />
      <div className="row vertical-center-row">
        <div className="col-md-4 col-md-offset-4">
          <h1>Sign in</h1>
          <TextField
            floatingLabelText="email" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <TextField
            floatingLabelText="password"
            type="password" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
        </div>
        <div className="col-md-4">
          <RaisedButton label="Sign in" primary={true} />
        </div>
        <div className="col-md-4">
        </div>
      </div>
        {this.props.children}
      </div>
    );
  },
});

export default Login;