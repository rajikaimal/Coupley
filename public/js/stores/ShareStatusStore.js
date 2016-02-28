var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ShareConstants = require('../constants/ShareConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchshares; 

var ShareStatusStore = assign({},EventEmitter.prototype, {
    getshares: function() {
      console.log("ShareStatusStore");
      console.log(searchshares);
      return searchshares;
    },
    saveshares: function(results) {
      console.log("saveshares");
      console.log(results);
      searchshares = results;
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
		case(ShareConstants.SHARESTATUS):
      console.log(payload.action.sharestatus);
      ShareStatusStore.saveshares(payload.action.sharestatus);
      ShareStatusStore.emitChange();
      break;
	}
});

module.exports = ShareStatusStore;
