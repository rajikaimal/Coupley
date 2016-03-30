var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var RegisterActions = {
  checks: function (credentials) {

    $.post('/admin-api/registerAdmin', credentials, function (data) {
      socket.emit('register', credentials);
      if (data.status === 201) {
        swal('Successful!', 'New Administrator added to the system', 'success');
        setTimeout(function () {
          location.reload(true);
        }, 1500);
      }else if (data.status === 203) {
        swal('Something Went Wrong', 'Please check your internet connection and retry', 'error');
      } else if (data.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }else {
        swal('Error', 'An account with the same email exists already. Please provide a diffrent ' +
            'email.', 'error');
      }
    }).fail(function () {
      swal('Error', 'An account with the same email exists already', 'error');
    });

  },
};

module.exports = RegisterActions;
