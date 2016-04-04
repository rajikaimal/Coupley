var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LikeConstants = require('../constants/LikeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchLikedUsers=[]; 
var searchCount=[]; 

var LikeStatusStore = assign({},EventEmitter.prototype, {

  /**
   * Get liked usres.
   * return {object}
   */
  getLikedUsers: function() {
    return searchLikedUsers;
  },

  /**
   * Put results(liked status) to searchLikedUsers.
   */
  savelikedUsers: function(results) {
    searchLikedUsers.push(results);
  },

  getCount: function(results) {
    return searchCount;
  },

  saveCount: function(results) {
    searchCount.push(results);
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
    case (LikeConstants.GETUSERS):
      LikeStatusStore.savelikedUsers(payload.action.likedUsers);
      LikeStatusStore.emitChange();
      break;
    case (LikeConstants.GETCOUNT):
      LikeStatusStore.saveCount(payload.action.countValue);
      LikeStatusStore.emitChange();
      break;
	}
});

module.exports = LikeStatusStore;
