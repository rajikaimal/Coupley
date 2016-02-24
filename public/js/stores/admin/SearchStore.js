var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../../constants/SearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchresults = [];

var SearchStore = assign({}, EventEmitter.prototype, {
  getresults: function () {
    return searchresults;
  },

  saveresults: function (results) {
    searchresults = results;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function (payload) {
  switch (payload.action.actionType) {
    case (SearchConstants.SEARCH):
      console.log(payload.action.search);
      SearchStore.saveresults(payload.action.search);
      SearchStore.emitChange();
      break;

  }
});

module.exports = SearchStore;
