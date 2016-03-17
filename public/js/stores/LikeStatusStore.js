var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LikeConstants = require('../constants/LikeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchLikes=[]; 

var LikeStatusStore = assign({},EventEmitter.prototype, {

  /**
   * Get liked status.
   * return {object}
   */
  getLikes: function() {
    return searchLikes;
  },

  /**
   * Put results(liked status) to searchLikes.
   */
  savelikes: function(results) {
    searchLikes.push(results);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  
  /**
   * @param {function} callback
   */  
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (payload) {
  switch (payload.action.actionType) {
    case (LikeConstants.LIKESTATUS):
      LikeStatusStore.savelikes(payload.action.likestatus);
      LikeStatusStore.emitChange();
      break;
	}
});

module.exports = LikeStatusStore;
