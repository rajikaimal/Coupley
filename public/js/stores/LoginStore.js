var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LoginConstants = require('../constants/LoginConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var email;

var LoginStore = assign({}, EventEmitter.prototype, {
  save: function(token) {
    localStorage.setItem('apitoken', token);
  },
  saveEmail: function(email) {
    localStorage.setItem('email', email);
  },
  storefirstname: function(firstname) {
    localStorage.setItem('firstname', firstname);
  },
  getState: function() {
    return localStorage.getItem('apitoken');
  },
  getEmail: function() {
    return localStorage.getItem('email');
  },
  getFirstname: function() {
    return localStorage.getItem('firstname');
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  console.log(payload.action);
  switch(payload.action.actionType) {
    case(LoginConstants.LOGIN): 
      LoginStore.save(payload.action.token);
      LoginStore.saveEmail(payload.action.email);
      LoginStore.emitChange();
    case(LoginConstants.PROPOGATE):
      LoginStore.storefirstname(payload.action.firstname);
      LoginStore.emitChange();
  }
});

module.exports = LoginStore;