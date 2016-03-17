var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ShareConstants = require('../constants/ShareConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchShares = []; 

var ShareStatusStore = assign({},EventEmitter.prototype, {

  /**
   * Get shared status.
   * return {object}
   */
  getShares: function() {
    return searchShares;
  },

  /**
   * Put results(shared status) to searchShares.
   */
  saveshares: function(results) {
    searchShares.push(results);
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

AppDispatcher.register(function(payload) {
	switch(payload.action.actionType) {
		case(ShareConstants.SHARESTATUS):
      ShareStatusStore.saveshares(payload.action.sharestatus);
      ShareStatusStore.emitChange();
      break;
	}
});

module.exports = ShareStatusStore;
