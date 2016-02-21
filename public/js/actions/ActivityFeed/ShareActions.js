var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ActivityFeedConstants = require('../../constants/ActivityFeedConstants');

var ShareActions = {
  add_share: function(share){
    $.post('api/share', share, function(response) {
      console.log(response);
      });
  },

  };

module.exports = ShareActions;