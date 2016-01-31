var AppDispatcher = require('../dispatcher/AppDispatcher');
var RegisterConstants = require('../constants/RegisterConstants');

var RegisterActions = {
  check: function(credentials) {
  	console.log(credentials);
  	$.post('/api/register', credentials, function(response) {
  		console.log(response.status);
      if(response.status === 505) {
        document.getElementById('serverstatus').innerHTML = "Something happened, please try again ...";
      }
      else if(response.status === 200) {
        document.getElementById('serverstatus').innerHTML = "An account with the give email exists";
      }
      else if(response.status === 201) {
        document.location = "/";    
      }
  	});
  	
  },
  register: function(credentials) {
    console.log('Action register');
    
    document.location = "/";
  }
};

module.exports = RegisterActions;