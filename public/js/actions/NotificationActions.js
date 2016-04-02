var AppDispatcher = require('../dispatcher/AppDispatcher');
var NotificationConstants = require('../constants/NotificationConstants');

var NotificationActions = {
  getInitialNo: function () {
    $.get('/api/profile/notifications?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username'), function (response) {
      if (response.status == 200 && response.count) {
        AppDispatcher.handleViewAction({
          actionType: NotificationConstants.NOTIFICATIONNO,
          notificationno: response.count,
        });
      } else {
        AppDispatcher.handleViewAction({
          actionType: NotificationConstants.NOTIFICATIONNO,
          likestatus: response,
        });
      }
    });
  },

  getList: function () {
    $.get('/api/profile/notificationlist?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username'), function (response) {
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

  updateListFromSocket: function (data) {
    AppDispatcher.handleViewAction({
      actionType: NotificationConstants.SOCKETNOTFICATION,
      notification: data,
    });
  },
};

module.exports = NotificationActions;
