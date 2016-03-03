var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchcomments = [];

var CommentStore = assign({}, EventEmitter.prototype, {
  getCommentsData: function () {
      return searchcomments;
    },

  saveCommentsData: function (results) {
      searchcomments = results;
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
    case (CommentConstants.GETCOMMENT):
      CommentStore.saveCommentsData(payload.action.commentdata);
      CommentStore.emitChange();
      break;
  }
});

module.exports = CommentStore;
