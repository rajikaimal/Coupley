var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../constants/ActivityFeedConstants');

var ActivityFeedActions = {
  add_status: function(status){
    $.post('api/status', status, function(response) {
      console.log(response);
      });
	}
  
  	/*$.get('api/authenticate?token=' + localStorage.getItem('apitoken') , function(response))
  		console.log(response.user[0].userid)
  	  if(response.token) {
        AppDispatcher.handleViewAction({
          actionType: ActivityFeedConstants.PROPOGATE,
          userid: response.user[0].userid
        });
      }
      else {
        console.log(response);
      }	*/





}

module.exports = ActivityFeedActions;