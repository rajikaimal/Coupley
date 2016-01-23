var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');

var LoginActions = {
  login: function(credentials) {
    console.log('Action login');
    
    document.location = "/";
  }
};

module.exports = LoginActions;