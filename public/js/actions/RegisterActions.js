var AppDispatcher = require('../dispatcher/AppDispatcher');
var RegisterConstants = require('../constants/RegisterConstants');

var RegisterActions = {
  check: function(credentials) {
  	console.log(credentials);
  	document.location = "/";
  },
  register: function(credentials) {
    console.log('Action register');
    
    document.location = "/";
  }
};

module.exports = RegisterActions;