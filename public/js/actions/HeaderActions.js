var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');

var HeaderActions = {
  getprofilename: function(email) {
    console.log(email);
  	$.get('/api/authenticate?token=' + localStorage.getItem('apitoken'), function(response) {
  		console.log(response.user[0].firstname);
  	  if(response.token) {
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.PROPOGATE,
          firstname: response.user[0].firstname
        });
      }
      else {
        console.log(response);
      }	
    });
  }
};

module.exports = HeaderActions;