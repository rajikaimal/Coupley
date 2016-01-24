var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LoginConstants = require('../constants/LoginConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var apitoken;

var LoginStore = assign({}, EventEmitter.prototype, {
  save: function(token) {
    localStorage.setItem('apitoken', token);
  },
  getState: function() {
    return localStorage.getItem('apitoken');
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
      console.log(payload.action.token);
      LoginStore.emitChange();
  }
});

module.exports = LoginStore;