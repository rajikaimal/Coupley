var AppDispatcher = require('../dispatcher/AppDispatcher');
var LoginConstants = require('../constants/LoginConstants');
var SearchConstants = require('../constants/SearchConstants');

var HeaderActions = {
  getprofilename: function(email) {
    console.log(email);
  	$.get('/api/authenticate?token=' + localStorage.getItem('apitoken'), function(response) {
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
  },
  getsearchresults: function(searchkey) {
    if(searchkey == "") {
      console.log('Null searchkey');
    }
    else {
      $.get('/api/search?token=' + localStorage.getItem('apitoken') + '&key=' + searchkey, function(response) {
        if(response.status == 200) {
          AppDispatcher.handleViewAction({
            actionType: SearchConstants.SEARCH,
            search: response.users
          });
        }
        else if(response.status == 505) {
          console.log('Error 505');
        }
      });  
    }
    
  }
};

module.exports = HeaderActions;