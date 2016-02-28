var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActivityFeedConstants = require('../constants/ActivityFeedConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchresults = [];
var searchID; 
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
    getStatusID:function() {
      console.log(searchID);
      return searchID;
    },
    saveStatusID: function(results) {
      console.log(results);
      searchID = results;
    },
    getcheckStatus: function() {
      return checkuserzPost;
    },
    savecheckStatus: function(results) {
      console.log("ssssssssssssssssssssssssssssssssssssss");
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
    case(ActivityFeedConstants.GETID):
      console.log(payload.action.pid);
      StatusStore.saveStatusID(payload.action.pid);
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