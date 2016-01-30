import React from 'react';
import Login from './login/Login.react';
import Register from './register/Register.react';

const homeStyle = {
	backgroundImage: 'url(/img/home.jpg)',
	backgroundSize: '1400',
	backgroundRepeat: 'no-repeat'
}

const Home = React.createClass({
  render () {
    return (
      <div className="container container-tab" style={homeStyle}>
        <Login />
        <Register />
      </div>
    );
  },
});

export default Home;