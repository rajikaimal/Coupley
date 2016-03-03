var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfileConstants = require('../constants/ProfileConstants');

var LoginActions = {
  save: function() {
    $.post('/api/quizresults?email=' + localStorage.getItem('email') + '&' , function(response) {
    	
    });
  }
};

module.exports = LoginActions;