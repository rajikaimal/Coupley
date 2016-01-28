var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var visitor = {};

var VisitorStore = assign({}, EventEmitter.prototype, {
  saveuserdata: function(data) {
    visitor = data;
  },
  getuserdata: function() {
    return visitor;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  switch(payload.action.actionType) {
    case(ProfileConstants.VISITOR):
      console.log('Visitor store ');
      VisitorStore.saveuserdata(payload.action.userdata);
      console.log('Visitor object ');
      console.log(visitor);
      VisitorStore.emitChange();
      break;

  }
});

module.exports = VisitorStore;