var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NotificationsConstants = require('../constants/NotificationConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var notifications = [];
var notificationNumber = 0;
var list = [];

var NotificationStore = assign({}, EventEmitter.prototype, {
  saveNotfication: function (data) {
    notifications.push(data);
  },

  saveNotficationNumber: function (data) {
    notificationNumber = data;
  },

  saveList: function(data) {
    list = data;
  },

  getList: function() {
    return list;
  },

  getNumber: function () {
    return notificationNumber;
  },

  getState: function () {
    return localStorage.getItem('apitoken');
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function (payload) {
  switch (payload.action.actionType) {
    case (NotificationsConstants.NOTIFICATION):
      NotificationStore.saveNotfication(payload.action.notification);
      NotificationStore.emitChange();
      break;
    case (NotificationsConstants.NOTIFICATIONNO):
      NotificationStore.saveNotficationNumber(payload.action.notificationno);
      NotificationStore.emitChange();
      break;
    case (NotificationsConstants.LIST):
      console.log('Got got itt');
      console.log(payload.action.list);
      NotificationStore.saveList(payload.action.list);
      NotificationStore.emitChange();
      break;  
  }
});

module.exports = NotificationStore;
