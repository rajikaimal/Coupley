var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var ActivityFeedActions = {
  add_status: function(status){
    $.post('api/status', status, function(response) {
      console.log(response);
      });
  }

  /*ImageUpload: function(imageupload){
    $.post('api/imageupload', imageupload, function(response) {
      console.log(response);
      });
  },*/
  


};

module.exports = ActivityFeedActions;