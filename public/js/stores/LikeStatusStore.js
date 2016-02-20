var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LikeConstants = require('../constants/LikeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchlikes; 

var LikeStatusStore = assign({},EventEmitter.prototype, {
    getlikes: function() {
      console.log("LikeStatusStore");
      console.log(searchlikes);
      return searchlikes;
    },
    savelikes: function(results) {
      console.log(results);
      searchlikes = results;
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
		case(LikeConstants.LIKESTATUS):
      console.log(payload.action.likestatus);
      LikeStatusStore.savelikes(payload.action.likestatus);
      LikeStatusStore.emitChange();
      break;
	}
});

module.exports = LikeStatusStore;
