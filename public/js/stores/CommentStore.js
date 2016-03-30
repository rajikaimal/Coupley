var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchComments = []; 

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
    // searchComments.postID = results[0].post_id;
    // searchComments.comments = results;
    searchComments.push(results);
    console.log('Search comments');
    console.log(searchComments);
    
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
	}
});

module.exports = CommentStore;
