var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var suggestions = [];
var counter = 0;
var initial = 3;

var SuggestionStore = assign({}, EventEmitter.prototype, {
  getResults: function () {
    return suggestions;
  },

  saveResults: function (data) {
    suggestions = data;
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
    case (ProfileConstants.SUGGESTIONS):
      SuggestionStore.saveResults(payload.action.suggestions);
      SuggestionStore.emitChange();
      break;
  }
});

module.exports = SuggestionStore;
