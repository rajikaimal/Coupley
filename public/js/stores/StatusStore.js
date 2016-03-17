var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActivityFeedConstants = require('../constants/ActivityFeedConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchResults = [];
var profileposts;

var StatusStore = assign({}, EventEmitter.prototype, {

  /**
   * Get activity feed data.
   * return {object}
   */
  getStatusData: function () {
    return searchResults;
  },

  /**
   * Put results(activity feed data) to searchresults.
   */
  saveStatusData: function (results) {
    searchResults = results;
  },

  /**
   * Get profile post.
   * return {object}
   */
  getprofilePosts: function () {
    return profileposts;
  },

  /**
   * Put data to profileposts.
   */
  saveprofileposts: function (data) {
    profileposts = data;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
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
    case (ActivityFeedConstants.GETPROFILEPOSTS):
      StatusStore.saveprofileposts(payload.action.posts);
      StatusStore.emitChange();
      break;
  }
});

module.exports = StatusStore;
