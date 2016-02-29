var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActivityFeedConstants = require('../constants/ActivityFeedConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchresults = [];
var checkuserzPost;

var StatusStore = assign({},EventEmitter.prototype, {

    getStatusData: function() {
      console.log(searchresults);
      return searchresults;
    },
    saveStatusData: function(results) {
      console.log(results);
      searchresults = results;
    },
    getcheckStatus: function() {
      console.log('status store');
      console.log(checkuserzPost);
      return checkuserzPost;
    },
    savecheckStatus: function(results) {
      console.log(results);
      checkuserzPost = results;
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
      StatusStore.saveStatusData(payload.action.statusdata);
      StatusStore.emitChange();
      break;
    case(ActivityFeedConstants.CHECKSTATUS):
      console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
      console.log(payload.action.checkStatus);
      StatusStore.savecheckStatus(payload.action.checkStatus);
      StatusStore.emitChange();
      break;
	}
});

module.exports = StatusStore;