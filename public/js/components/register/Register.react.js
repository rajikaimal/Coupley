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
      value: 1
    }
  },
  _handleRegisterClickEvent: function() {
    let username = this.refs.username.getValue();
    let password = this.refs.password.getValue();
    let credentials = {
      username: username,
      password: password
    };
    RegisterActions.check(credentials);
    console.log('Done calling !');
  },
  handleChange: function(e, index, value){
    this.setState({value: value})
  },
  render: function() {
    return (
      <div style={registerStyle}>
        <Paper  zDepth={2}>
        <div className="col-lg-4">
        </div>
        <div className="col-lg-4">
          <TextField
            floatingLabelText="username" ref="username"/>
          <TextField
            floatingLabelText="email" ref="email"/>
          <br/>
          <TextField
            floatingLabelText="firstname" ref="firstname"/>
          <br/>
          <TextField
            floatingLabelText="lastname" ref="lastname"/>
          <br/>
          <TextField
            type="password"
            floatingLabelText="password" ref="password"/>
          <br/>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
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