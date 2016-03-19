var AppDispatcher = require('../dispatcher/AppDispatcher');
var LikeListConstants = require('../constants/LikeConstants');

var LikeActions = {
  getList: function () {
    $.get('/api/profile/likedlist?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username'), function (response) {
      console.log('Gonna dispath');
      console.log(response.list);
      if (response.status == 200 && response.list) {
        console.log('dispathing ');
        AppDispatcher.handleViewAction({
          actionType: LikeListConstants.LIKESLIST,
          likeslist: response.list
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: LikeListConstants.LIKESLIST,
          likeslist: response.list,
        });
      }
    });
  },
};

module.exports = LikeActions;
