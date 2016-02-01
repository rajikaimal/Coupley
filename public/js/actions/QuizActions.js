var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfileConstants = require('../constants/ProfileConstants');

var LoginActions = {
  save: function() {
    $.post('/api/quizresults?email=' + localStorage.getItem('email') + '&' , function(response) {
    	console.log('Got user data .....');
    	console.log(response);
    });
  }
};

module.exports = LoginActions;