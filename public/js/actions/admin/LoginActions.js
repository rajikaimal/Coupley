var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');

var AdminLoginActions = {
  login: function(credentials) {
    console.log('Action login');
    
    document.location = "/cp-admin#dashboard";
  }
};

module.exports = AdminLoginActions;