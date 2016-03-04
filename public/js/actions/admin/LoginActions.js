var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');

var AdminLoginActions = {
  login: function (credentials) {
    console.log('Action login');
    $.post('/admin-api/authenticates', credentials, function (response) {
      if (response.token) {
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN,
          token: response.token,
        });
        swal('Welcome Back!', 'Login Successful.', 'success');
        setTimeout(function () {
          history.go(0);
        }, 1000);
      }      else if (response.status === 203) {
        swal('Oops!', 'You are not an Administrator. Please visit WWW.COUPLEY.COM', 'error');
      } else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    }).fail(function () {
      document.getElementById('server-error').innerHTML = '*Invalid credentials';
      swal('Oops!', 'Invalid combination of Email/Password, Please try again', 'error');
    });

  },

  resetpassword: function (email) {
    $.post('/admin-api/recoverpwd', email, function (response) {
      if (response.status === 202) {
        swal('Error', 'Your email doesnt exists in the system.', 'error');
      } else if (response.status === 207) {
        swal('Check your mail!', 'New password has been sent to you email.', 'success');
      } else if (response.status === 203) {
        swal('Something went wrong', 'Please check your internet connection and retry', 'error');
      }
    });
  },
};

module.exports = AdminLoginActions;
