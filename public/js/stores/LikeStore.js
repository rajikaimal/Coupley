var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LikeConstants = require('../constants/LikeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var list = [];

var LikeStore = assign({}, EventEmitter.prototype, {
  saveList: function (data) {
    console.log('saving list' + data);
    list = data;
  },

  getList: function() {
    return list;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function (payload) {
  console.log('payload');
  switch (payload.action.actionType) {
    case (LikeConstants.LIKESLIST):
      console.log('savaingagad');
      LikeStore.saveList(payload.action.likeslist);
      LikeStore.emitChange();
      break;
  }
});

module.exports = LikeStore;
