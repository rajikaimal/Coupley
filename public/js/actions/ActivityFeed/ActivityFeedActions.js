var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var ActivityFeedActions = {
  add_status: function(status){
    $.post('api/status', status, function(response) {
      console.log(response);
      if(response.status == 201) {
            $.get('/api/getstatus', function(response) {
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
      else if(response.status == 404) {
        console.log('Error 404');
      }
      });
  },

 getstatus: function() {
    $.get('/api/getstatus', function(response) {
      console.log(response);
      console.log('view status ');
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
  },

  getpostId: function() {
    $.get('/api/getpostId' , function(response) {
      console.log(response);
      if (response.status == 200) {
            AppDispatcher.handleViewAction({
            actionType: ActivityFeedConstants.GETID,
            id: response.posts
          });
      }
      else if (response.status == 505) {
            console.log('Error 505');
      }
    });
  },


  delete_status: function(postId){
    $.post('api/deleteStatus', postId, function(response) {
      console.log(response);
      });
  },

  editstatus:function(txt){
   $.post('api/edit_status',txt , function(response) {
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
