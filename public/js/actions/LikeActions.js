var AppDispatcher = require('../dispatcher/AppDispatcher');
var LikeListConstants = require('../constants/LikeConstants');

var likedList = 0;
var likedMe = 0;
var likeBack = 0;

var LikeActions = {
  getList: function () {
    likedList = likedList + 5;
    $.get('/api/profile/likedlist?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username') + '&pagination=' + likedList, function (response) {
      if (response.status == 200 && response.list) {
        AppDispatcher.handleViewAction({
          actionType: LikeListConstants.LIKESLIST,
          likeslist: response.list,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: LikeListConstants.LIKESLIST,
          likeslist: response.list,
        });
      }
    });
  },

  getListLikedMe: function () {
    likedMe = likedMe + 5;
    $.get('/api/profile/likedlistme?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username') + '&pagination=' + likedMe, function (response) {
      if (response.status == 200 && response.list) {
        AppDispatcher.handleViewAction({
          actionType: 'LIKESLISTME',
          likeslist: response.list,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: LikeListConstants.LIKESLISTME,
          likeslist: response.list,
        });
      }
    });
  },

  getLikedBackList: function () {
    likeBack = likeBack + 5;
    $.get('/api/profile/likedbacklist?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username') + '&pagination=' + likeBack, function (response) {
      if (response.status == 200 && response.list) {
        AppDispatcher.handleViewAction({
          actionType: 'LIKEDBACKLIST',
          likeslist: response.list,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: 'LIKEDBACKLIST',
          likeslist: response.list,
        });
      }
    });
  },
};

module.exports = LikeActions;
