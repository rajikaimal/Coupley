var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var feed = [];

var ActivityFeedStore = assign({}, EventEmitter.prototype, {
  saveFeed: function (data) {
    feed = data;
  },

  getfeed: function () {
    return feed;
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
    case (ProfileConstants.FEED):
      ActivityFeedStore.saveFeed(payload.action.feed);
      ActivityFeedStore.emitChange();
      break;

  }
});

module.exports = ActivityFeedStore;
