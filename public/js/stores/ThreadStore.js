var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ThreadConstants = require('../constants/ThreadConstants');
var assign = require('object-assign');

var CHAT_EVENT = 'change';

var Thread = [];

var ThreadStore = assign({}, EventEmitter.prototype, {

  getmessages: function () {
    return Thread;
  },

  savemessage: function (data) {
    Thread.push(data);
  },

  emitChange: function () {
    this.emit(CHAT_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHAT_EVENT, callback);
  },
});

AppDispatcher.register(function (payload) {
  switch (payload.action.actionType) {
    case (ThreadConstants.SAVE):
      ThreadStore.savemessage(payload.action.chatmessage);
      ThreadStore.emitChange();
      break;
  }
});

module.exports = ThreadStore;
