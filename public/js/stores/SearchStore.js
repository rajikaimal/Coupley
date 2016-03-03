var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/SearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchresults = [];
var counter = 0;
var initial = 3;

var SearchStore = assign({}, EventEmitter.prototype, {
  getResults: function () {
    let portion = searchresults.slice(0, 3);
    return portion;
  },

  getPaginationResults: function () {
    counter = counter + 2;
    let end = initial + counter;
    return searchresults.slice(0, end);
  },

  saveResults: function (results) {
    searchresults = results;
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
    case (SearchConstants.SEARCH):
      SearchStore.saveResults(payload.action.search);
      SearchStore.emitChange();
      break;

  }
});

module.exports = SearchStore;
