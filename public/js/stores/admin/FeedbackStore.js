var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FeedConstants = require('../../constants/FeedConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var FeedResults = [];

var FeedStore = assign({}, EventEmitter.prototype, {
  getresults: function () {
    alert(FeedResults + 'hy feed from store');
    return FeedResults;
  },

  saveresults: function (results) {
    FeedResults = results;
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
    case (FeedConstants.SEARCH):
      FeedStore.saveresults(payload.action.timelineFeed);
      FeedStore.emitChange();
      break;

  }
});

module.exports = FeedStore;
