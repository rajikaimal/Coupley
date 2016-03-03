var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActivityFeedConstants = require('../constants/ActivityFeedConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchresults = [];
var checkuserzPost = [];
var profileposts;

var StatusStore = assign({}, EventEmitter.prototype, {

  getStatusData: function () {
      return searchresults;
    },

  getprofilePosts: function () {
      return profileposts;
  },

  saveprofileposts: function (data) {
      profileposts = data;
  },

  saveStatusData: function (results) {
      searchresults = results;
    },
  getcheckStatus: function() {
      return checkuserzPost;
    },
  savecheckStatus: function(results) {
      checkuserzPost.push(results);
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
    case (ActivityFeedConstants.GETDATA):
      StatusStore.saveStatusData(payload.action.statusdata);
      StatusStore.emitChange();
      break;
    case(ActivityFeedConstants.CHECKSTATUS):
      StatusStore.savecheckStatus(payload.action.checkStatus);
      StatusStore.emitChange();
      break;
    case (ActivityFeedConstants.GETPROFILEPOSTS):
      StatusStore.saveprofileposts(payload.action.posts);
      StatusStore.emitChange();
      break;
  }
});

module.exports = StatusStore;
