var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActivityFeedConstants = require('../constants/ActivityFeedConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchresults = [];
var profileposts = [];
var searchID;
var counter = 0;
var initial = 3;

var StatusStore = assign({}, EventEmitter.prototype, {

  getStatusData: function () {
      return searchresults;
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

  saveprofileposts: function (data) {
    profileposts = [];
    profileposts = data;
  },

  saveStatusData: function (results) {
    searchresults = [];
    searchresults = results;
  },

  getStatusID:function () {
      return searchID;
    },

  saveStatusID: function (id) {
      console.log(id);
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
      console.log('mmmmm');
      console.log(payload.action.statusdata);
      StatusStore.saveStatusData(payload.action.statusdata);
      StatusStore.emitChange();
      break;
    case (ActivityFeedConstants.GETID):
      console.log(payload.action.id);
      StatusStore.saveStatusID(payload.action.id);
      StatusStore.emitChange();
      break;
    case (ActivityFeedConstants.GETPROFILEPOSTS):
      StatusStore.saveprofileposts(payload.action.posts);
      StatusStore.emitChange();
      break;
  }
});

module.exports = StatusStore;
