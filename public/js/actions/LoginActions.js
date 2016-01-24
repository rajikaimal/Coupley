var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');

var LoginActions = {
  login: function(credentials) {
    $.post('/api/authenticate', credentials, function(response) {
    	if(response.token) {
    		AppDispatcher.handleViewAction({
		      actionType: LoginConstants.LOGIN,
		      token: response.token,
		      email: credentials.email
		    });
		    console.log('Dispatched');
   			//document.location = "/";
   		}
    	else {
    		console.log(response);
    	}
    	
    })
    
  }
};

module.exports = LoginActions;