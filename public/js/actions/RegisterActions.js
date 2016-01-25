var AppDispatcher = require('../dispatcher/AppDispatcher');
var RegisterConstants = require('../constants/RegisterConstants');

var RegisterActions = {
  check: function(credentials) {
  	console.log(credentials);
  	$.post('/api/register', credentials, function(data) {
  		if(data.status === 201) {
        
      }
  	});
  	document.location = "/";
  
  },
  register: function(credentials) {
    console.log('Action register');
    
    document.location = "/";
  }
};

module.exports = RegisterActions;