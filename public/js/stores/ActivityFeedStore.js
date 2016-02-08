var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActivityFeedConstants = require('../constants/ActivityFeedConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchresults = []; 

var ActivityFeedStore = assign({},EventEmitter.prototype, {

    getStatusData: function() {
      console.log(searchresults);
      return searchresults;
    },
    saveStatusData: function(results) {
      console.log(results);
      searchresults = results;
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
		case(ActivityFeedConstants.GETDATA):
      console.log(payload.action.statusdata);
      ActivityFeedStore.saveStatusData(payload.action.statusdata);
      ActivityFeedStore.emitChange();
      break;
	}
});

module.exports = ActivityFeedStore;
