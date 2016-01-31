var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');

var AdminLoginActions = {
  login: function(credentials) {
    console.log('Action login');
      $.post('/admin-api/authenticates', credentials, function (response) {
          if(response.token) {
              AppDispatcher.handleViewAction({
                  actionType: LoginConstants.LOGIN,
                  token: response.token
              });
              console.log('Dispatched');

              //document.location = "/cp-admin#dashboard";
          }
          else {
              console.log(response);
          }

      })

  }
};

module.exports = AdminLoginActions;