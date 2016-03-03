var AppDispatcher = require('../dispatcher/AppDispatcher');
var RegisterConstants = require('../constants/RegisterConstants');

var RegisterActions = {
  check: function (credentials) {

    $.post('/api/register', credentials, function (response) {

      if (response.status === 505) {
        document.getElementById('serverstatus').innerHTML = 'Something happened, please try again ...';
      } else if (response.status === 200) {
        document.getElementById('serverstatus').innerHTML = 'An account with the give email exists';
      } else if (response.status === 201) {
        let email = credentials.email;
        localStorage.setItem('email', email);
        document.location.href = '/#/login';
      }
    });

  },

  register: function (credentials) {

    document.location = '/';
  },

  checkUsername: function (username) {

    $.get('/api/register/checkusername?username=' + username, function (response) {

      if (response.status === 201) {
        if (response.exists == true) {
          document.getElementById('username').innerHTML = '*already exists';
        }

        if (response.exists == false) {
          document.getElementById('username').innerHTML = '';
        }
      }
    });
  },

  checkEmail: function (email) {
    $.get('/api/register/checkemail?email=' + email, function (response) {

      if (response.status === 201) {
        if (response.exists == true) {
          document.getElementById('email').innerHTML = '*already exists';
        }

        if (response.exists == false) {
          document.getElementById('email').innerHTML = '';
        }
      }
    });
  },
};

module.exports = RegisterActions;
