var AppDispatcher = require('../../dispatcher/AppDispatcher');
var NotificationConstants = require('../../constants/NotificationConstants');

var NotificationActions = {
  getInitialNo: function () {
    $.get('/admin-api/notifications', function (response) {
      if (response.status == 200 && response.count) {
        AppDispatcher.handleViewAction({
          actionType: NotificationConstants.NOTIFICATIONNO,
          notificationno: response.count,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: NotificationConstants.NOTIFICATIONNO,
          notificationno: response,
        });
      }
    });
  },

  getList: function () {
    $.get('/admin-api/notificationlist', function (response) {
      console.log('listing ....');
      console.log(response.list);
      if (response.status == 200 && response.list) {
        AppDispatcher.handleViewAction({
          actionType: NotificationConstants.LIST,
          list: response.list,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: NotificationConstants.LIST,
          list: response.list,
        });
      }
    });
  },

  setOne: function () {
    $.get('/admin-api/readNotifications', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: NotificationConstants.NOTIFICATIONNO,
          notificationno: response.count,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: NotificationConstants.NOTIFICATIONNO,
          notificationno: response,
        });
      }
    });
  },

  updateListFromSocket: function (data) {
    AppDispatcher.handleViewAction({
      actionType: NotificationConstants.SOCKETNOTFICATION,
      notification: data.message,
    });
  },
};

module.exports = NotificationActions;
