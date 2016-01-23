import React from 'react';
import Login from './login/Login.react';
import Register from './register/Register.react';

const Home = React.createClass({
  render () {
    return (
      <div className="container container-tab">
        <Login />
        <Register />
      </div>
    );
  },
});

export default Home;