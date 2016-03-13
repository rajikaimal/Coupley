var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PathConstants = require('../../constants/PathConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var PathStore = assign({}, EventEmitter.prototype, {
  getpath: function () {
    console.log(window.location.href);
    var link = window.location.href;
    var componentName = (link.split('/')[4]).split('?')[0];
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    return {
      path:componentName,
    };
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
    case (PathConstants.PATH):
      PathStore.emitChange();
      break;

  }
});

module.exports = PathStore;
