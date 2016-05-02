var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchComments = []; 
var commentCount=[]; 

var CommentStore = assign({},EventEmitter.prototype, {

  /**
   * Get comment data.
   * return {object}
   */
  getCommentsData: function() {
    return searchComments;
  },

  /**
   * Put results(comment data) to searchComments.
   */
  saveCommentsData: function(results) {
   // searchComments = [];
    searchComments.push(results);
  },

  loadMoreComments: function(data) {
    searchComments = [];
    searchComments.push(data);
  },

  getCommentCount: function(result) {
    return commentCount;
  },

  saveCommentCount: function(result) {
    commentCount.push(result);
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
		case(CommentConstants.GETCOMMENT):
      CommentStore.saveCommentsData(payload.action.commentdata);
      CommentStore.emitChange();
      break;
    case(CommentConstants.LOADMORE):
      CommentStore.loadMoreComments(payload.action.commentdata);
      CommentStore.emitChange();
      break;
    case (CommentConstants.GETCOMMENTCOUNT):
      CommentStore.saveCommentCount(payload.action.commentCount);
      CommentStore.emitChange();
      break;
	}
});

module.exports = CommentStore;
