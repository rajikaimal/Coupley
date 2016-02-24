var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AboutConstants = require('../constants/AboutConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var abouterr;

var ErrorStore = assign({}, EventEmitter.prototype, {
  saveerror: function (err) {
    console.log('Got err');
    abouterr = err;
  },

  getabouterr: function () {
    console.log('returned err');
    return abouterr;
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
    case (AboutConstants.SUMMARY):
      ErrorStore.saveerror(payload.action.error);
      ErrorStore.emitChange();
      break;
    case (AboutConstants.LIFE):
      ErrorStore.saveerror(payload.action.error);
      ErrorStore.emitChange();
      break;
    case (AboutConstants.GOODAT):
      ErrorStore.saveerror(payload.action.error);
      ErrorStore.emitChange();
      break;
    case (AboutConstants.THINKING):
      ErrorStore.saveerror(payload.action.error);
      ErrorStore.emitChange();
      break;
    case (AboutConstants.FAVS):
      ErrorStore.saveerror(payload.action.error);
      ErrorStore.emitChange();
      break;
  }
});

module.exports = ErrorStore;
