var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LoginConstants = require('../constants/LoginConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var email;

var LoginStore = assign({}, EventEmitter.prototype, {
  save: function (token) {
    localStorage.setItem('apitoken', token);
  },

  saveEmail: function (email) {
    localStorage.setItem('email', email);
  },

  storeUserData: function (data) {
    localStorage.setItem('user', data);
  },

  storeUsername: function (username) {
    localStorage.setItem('username', username);
  },

  storefirstname: function (firstname) {
    localStorage.setItem('firstname', firstname);
  },

  storeUserId: function(id) {
    localStorage.setItem('userid', id);
  }

  getState: function () {
    return localStorage.getItem('apitoken');
  },

  getEmail: function () {
    return localStorage.getItem('email');
  },

  getFirstname: function () {
    return localStorage.getItem('user');
  },

  getUsername: function () {
    return localStorage.getItem('username');
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
    case (LoginConstants.LOGIN):
      LoginStore.save(payload.action.token);
      LoginStore.saveEmail(payload.action.email);
      LoginStore.emitChange();
      break;
    case (LoginConstants.PROPOGATE):
      LoginStore.storeUserData(payload.action.userdata.firstname);
      LoginStore.storeUserId(payload.action.userdata.id);
      LoginStore.storeUsername(payload.action.userdata.username);
      LoginStore.emitChange();
      break;
    case (LoginConstants.CHANGEEMAIL):
      LoginStore.saveEmail(payload.action.email);
      LoginStore.emitChange();
      break;
  }
});

module.exports = LoginStore;
