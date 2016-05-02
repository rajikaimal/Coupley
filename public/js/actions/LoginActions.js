var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');

var LoginActions = {
  login: function (credentials) {
    $.post('/api/authenticate', credentials, function (response) {
      if (response.token) {
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN,
          token: response.token,
          email: credentials.email,
        });
        $.get('/api/authenticate?token=' + localStorage.getItem('apitoken') + '&email=' + credentials.email, function (response) {
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.PROPOGATE,
            userdata: response.user[0],
          });
        });

        //document.location = "/";
      } else if (response.status == 201) {
        document.getElementById('server-error').innerHTML = 'Sorry,You are blocked out of the System.';
      } else {
        return false;
      }
    }).fail(function () {
      document.getElementById('server-error').innerHTML = 'Invalid credentials';
    });
  },

  resetpassword: function (email) {
    $.post('/admin-api/recoverpwd', email, function (response) {
      if (response.status === 201) {
        swal('Error', 'Your email doesnt exists', 'error');

      }      else {

        swal('Check your e-mail!', 'New password has been sent to your email.', 'success');
        document.location = '/#/login';
      }
    });
  },
};

module.exports = LoginActions;
