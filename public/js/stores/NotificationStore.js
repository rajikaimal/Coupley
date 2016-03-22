var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NotificationsConstants = require('../constants/NotificationConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var notifications = [];
var notificationNumber = 0;
var list = [];
var socketList = [];

var NotificationStore = assign({}, EventEmitter.prototype, {
  saveNotficationNumber: function (data) {
    notificationNumber = data;
  },

  saveList: function (data) {
    list = data;
    list.concat(socketList);
  },

  saveSocketNotification: function (data) {
    let con = {
      content: data,
    };
    console.log('sockeeeeet' + con);
    socketList.push(con);
  },

  getList: function () {
    console.log('Getting nooooooottt');
    console.log(list);
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
      NotificationStore.saveList(payload.action.list);
      NotificationStore.emitChange();
      break;
    case (NotificationsConstants.SOCKETNOTFICATION):
      NotificationStore.saveSocketNotification(payload.action.notification);
      NotificationStore.emitChange();
      break;
  }
});

module.exports = NotificationStore;
