var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActivityFeedConstants = require('../constants/ActivityFeedConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchResults = [];
var profileposts = [];
var searchID;
var counter = 0;
var initial = 3;

var VisitorStatusStore = assign({}, EventEmitter.prototype, {

  getStatusData: function () {
      return searchResults;
    },

  getprofilePosts: function () {
    let portion = profileposts.slice(0, 5);
    return portion;
  },

  getPaginationResults: function () {
    counter = counter + 2;
    let end = initial + counter;
    return profileposts.slice(0, end);
  },

  saveProfilePosts: function (data) {
    profileposts = [];
    profileposts = data;
  },

  saveStatusData: function (results) {
    searchResults = [];
    searchResults = results;
  },

  getStatusID:function () {
      return searchID;
    },

  saveStatusID: function (id) {
      searchID = id;
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
      VisitorStatusStore.saveStatusData(payload.action.statusdata);
      VisitorStatusStore.emitChange();
      break;
    case (ActivityFeedConstants.GETID):
      VisitorStatusStore.saveStatusID(payload.action.id);
      VisitorStatusStore.emitChange();
      break;
    case (ActivityFeedConstants.GETPROFILEPOSTS):
      VisitorStatusStore.saveProfilePosts(payload.action.posts);
      VisitorStatusStore.emitChange();
      break;
  }
});

module.exports = VisitorStatusStore;
