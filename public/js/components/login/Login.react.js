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
import Colors from 'material-ui/lib/styles/colors';

var imgUrl = 'http://sp2.cinedor.es/728/foto-andrew-garfield-y-emma-stone-en-the-amazing-spider-man-3-781.jpg';

const loginStyle = {
   maxWidth: '100%',
   maxHeight: '100%',
   backgroundRepeat:'no-repeat',
   backgroundSize:'cover'

};

const buttonStyle = {
  marginTop: 25
}

const textStyle = {
  width: 300,
  marginRight: 25
};

const homeStyle = {
    marginTop: '45',
    height: '100%'
}

const loginRowStyle = {
    marginBottom: '45',
    height: '100%'
}

const logoStyle = {
    color: 'white',
    fontSize: '50'
}

const error = {
  color: Colors.red500
};

const signupStyle = {
    color: 'black',
    marginTop: '25'
}

const images = ['url(/img/slide1.jpg)', 'url(/img/slide2.jpg)', 'url(/img/slide3.jpg)'];

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
    let current = 0;
    let lenArr = images.length;
    // setInterval(function() {
    //   if(current != (lenArr)) {
    //     current++;
    //   }
    //   if(current == (lenArr)) {
    //     current = 0;
    //   }
    //   document.body.style.background = images[current];
    //   // $('body .img').fadeOut('slow', function() {
    //   //   document.body.style.background = images[current];
    //   // });
    // }, 3000);
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
  componentWillUnmount: function() {
    document.body.style.background = '';
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
  },
  render: function() {
    return (
      <div style={loginStyle}>
        <div className="container-fluid" style={homeStyle}>
          <div className="row-fluid" style={loginRowStyle}>
            <div className="col-md-12 col-lg-12">
              <span id="logo-login" style={logoStyle}> Coupley </span>
            </div>
          </div>
          <div className="row-fluid">
            <div className="col-sm-6 col-md-6 col-md-offset-6 col-lg-4 col-lg-offset-8">
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
                  <a href="/#/forgotpwd"> Forgot password ? </a>
                </CardActions>
                <span id="server-error" style={error}> </span>
              </Card> 

              <Card style={signupStyle}>
                <CardText>
                  Don't have an account ?
                  <a href="/#/register"> Sign up </a> for free ! 
                </CardText>
              </Card> 
            </div>
          </div>
        </div>  
      </div>
    );    
  }

});

export default Login;