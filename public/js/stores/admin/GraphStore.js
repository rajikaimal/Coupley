var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GraphConstants = require('../../constants/GraphConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Results = [];

var GraphStore = assign({}, EventEmitter.prototype, {
  getresults: function () {
    return Results;
  },

  saveresults: function (results) {
    Results = results;
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
    case (GraphConstants.USERS):
      GraphStore.saveresults(payload.action.Users);
      GraphStore.emitChange();
      break;
  }
});

module.exports = GraphStore;
