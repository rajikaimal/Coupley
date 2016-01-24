import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';

var imgUrl = 'http://sp2.cinedor.es/728/foto-andrew-garfield-y-emma-stone-en-the-amazing-spider-man-3-781.jpg';

const loginStyle = {
  backgroundImage: 'url(' + imgUrl + ')',
  width:100
};

const buttonStyle = {
  marginTop: 25
}

const textStyle = {
  width: 150,
  marginRight: 25
};

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
    let credentials = {
      email: email,
      password: password
    };
    LoginActions.login(credentials);
    console.log('Done calling !');
  },
  render: function() {
    return (
      <div>
        <div className="col-lg-4">
        </div>
        <div className="col-lg-4">
          
        </div>
        <div className="col-lg-4">
          <TextField
            floatingLabelText="email" ref="email" style={textStyle}/>
          <TextField
            floatingLabelText="password" ref="password" style={textStyle}/>
          <RaisedButton label="Signin" style={buttonStyle} primary={true} onTouchTap={this._handleLogin} />
        </div>        
      </div>
    );    
  }

});

export default Login;