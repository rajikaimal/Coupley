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


function validatePassword(password) {
  if(password.length < 6) {
    return {
      "error": "*password length must be 6 or more"
    }
  }
  let re = /[0-9]/;
  if(!re.test(password)) {
    return {
      "error": "*password must contain a number"
    }
  }
  re = /[a-z]/;
  if(!re.test(password)) {
    return {
      "error": "*password must contain a lowercase letter"
    }
  }
  re = /[A-Z]/;
  if(!re.test(password)) {
    return {
      "error": "*password must contain a uppercase letter"
    }
  }
  else {
    return true;
  }
}

const Register = React.createClass({
  getInitialState: function() {
    return {
      password: '',
      passwordErr: ''
    }
  },
  componentDidMount: function() {
    
  },
  _handlePasswordSubmit: function() {
    let val = false;
    let password = this.refs.password.getValue();
    let passwordAgain = this.refs.passwordagain.getValue();
    if(validatePassword(password).error) {
      val = false;
      this.setState({
        passwordErr: validatePassword(password).error
      });
      return false;
    }
    if(passwordAgain != password) {
      this.setState({
        passwordErr: "",
        passwordAgainErr: "*passwords don't match !"
      });
      return false;
    }
    else {
      this.setState({
        passwordErr: "",
        passwordAgainErr: "" 
      });
      val = true;
    }
    let credentials = {
      username: localStorage.getItem('username'),
      password: password
    };
    if (val) {
      UpdateInfo.updatePassword(credentials);
    }
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
            <CardTitle title="Change password" />
            <Table>
              <TableBody displayRowCheckbox={false}>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Password</TableRowColumn>
                <TableRowColumn> 
                  <TextField onKeyUp={this._checkPassword}
                  type="password"
                  errorText={this.state.passwordErr}
                  floatingLabelText="password" ref="password" hintStyle={styles.errorStyle} fullwidth={true}/>
                </TableRowColumn>
              </TableRow>
              <TableRow hoverable={false} hovered={false} selectable={false}>
                <TableRowColumn>Password again</TableRowColumn>
                <TableRowColumn> 
                  <TextField onKeyUp={this._match}
                  type="password"
                  errorText={this.state.passwordAgainErr}
                  floatingLabelText="password again" ref="passwordagain" hintStyle={styles.errorStyle} fullwidth={true}/>
                </TableRowColumn>
              </TableRow>
              </TableBody>
            <CardText>                

                   
            </CardText>
            </Table>
            <CardActions>
              <RaisedButton label="Save changes" style={buttonStyle} primary={true} onTouchTap={this._handlePasswordSubmit} />
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