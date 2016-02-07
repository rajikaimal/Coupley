var AppDispatcher = require('../../dispatcher/AppDispatcher');
var AboutConstants = require('../../constants/AboutConstants');

var AboutActions = {
  fetchAll: function() {
    $.get('/api/profile/about?token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email'), function(response) {
      console.log(response);
      if(response.status === 200) {
        AppDispatcher.handleViewAction({
          actionType: AboutConstants.FETCH,
          data: response.data[0]
        });
      }
      else {
        console.log('Somthing happened ...');
      }

    }).fail(function(error) {
      console.log('Somthing happened');
    });
  },
  updatesummary: function(summary) {
  	$.ajax({
      url: '/api/profile/edit/summary',
      type: 'PUT',
      data: "email=" + localStorage.getItem('email') + "&summary=" + summary,
      success: function(response) {
        console.log('DOne ... ' + response);
        if(response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.SUMMARY,
            summary: summary
          });
        } 
        else {
          console.log('Somthing happened');
        }
      }
    });
  }
};

module.exports = AboutActions;