var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var ActivityFeedActions = {
  add_status: function(status){
    $.post('api/status', status, function(response) {
      console.log(response);
      });
  },

 getstatus: function() {
    $.get('/api/getstatus' , function(response) {
      console.log(response);
      if (response.status == 200) {
            AppDispatcher.handleViewAction({
            actionType: ActivityFeedConstants.GETDATA,
            statusdata: response.posts
          });
      }
      else if (response.status == 505) {
            console.log('Error 505');
      }
    });
  }

  /*ImageUpload: function(imageupload){
    $.post('api/imageupload', imageupload, function(response) {
      console.log(response);
      });
  },*/
  
};

module.exports = ActivityFeedActions;