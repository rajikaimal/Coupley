import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';

import CardTitle from 'material-ui/lib/card/card-title';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';


var imgUrl = 'http://sp2.cinedor.es/728/foto-andrew-garfield-y-emma-stone-en-the-amazing-spider-man-3-781.jpg';

const loginStyle = {
  backgroundImage: 'url(' + imgUrl + ')',
  width:'100'
};

const buttonStyle = {
  marginTop: 25
}

const textStyle = {
  width: 300,
  marginRight: 25
};

const homeStyle = {
  backgroundImage: 'url(/img/home.jpg)',
  backgroundSize: '1400',
  backgroundRepeat: 'no-repeat'
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
    return false;
  }
  let re = /[0-9]/;
  if(!re.test(password)) {
    return false;
  }
  re = /[a-z]/;
  if(!re.test(password)) {
    return false;
  }
  re = /[A-Z]/;
  if(!re.test(password)) {
    return false;
  }
}

const Login = React.createClass({
  getInitialState: function() {
    console.log(LoginStore.getState());
    return { 
      apitoken: LoginStore.getState()
    };
  },
  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
    if(this.state.apitoken) {
      document.location = "/#/";
    }
    else {
      document.location = "/#/login";
    }
  },
  _onChange: function() {
    this.setState({ apitoken: LoginStore.getState() });
    if(this.state.apitoken) {
      document.location = "/#/";
    }
    else {
      document.location = "/#/login";
    }
  },
  _handleLogin: function() {
    let email = this.refs.email.getValue();
    let password = this.refs.password.getValue();
    if(! validateEmail(email)) {
      document.getElementById('emailval').innerHTML = 'Invalid Email !';
      return false;
    }
    // if(! validatePassword(password)) {
    //   document.getElementById('passwordval').innerHTML = 'Invalid Password !';
    // }
    let credentials = {
      email: email,
      password: password
    };
    LoginActions.login(credentials);
    console.log('Done calling !');
  },
  render: function() {
    return (
      <div style={homeStyle}>
        <div className="col-lg-4">
        </div>
        <div className="col-lg-4">
        
        </div>
        <div className="col-lg-4">
          <Card>
            <CardTitle title="Login" />
            <CardText>
              <TextField
              floatingLabelText="email" ref="email" fullwidth={true}/>
              <span id="emailval"> </span>
            <TextField
              floatingLabelText="password" type="password" ref="password" fullwidth={true}/>
              <span id="passwordval"> </span>          
            </CardText>
            <CardActions>
              <RaisedButton label="Signin" style={buttonStyle} primary={true} onTouchTap={this._handleLogin} />
            </CardActions>
          </Card>    
        </div>
      </div>
    );    
  }

});

export default Login;