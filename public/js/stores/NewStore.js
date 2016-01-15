var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = [];

var NewStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    console.log(_todos);
    return _todos;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  console.log(payload);
  _todos.push(payload);
  NewStore.emitChange();
});

module.exports = NewStore;