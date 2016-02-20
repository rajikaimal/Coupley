var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var searchcomments = []; 

var CommentStore = assign({},EventEmitter.prototype, {
    getCommentsData: function() {
      console.log(searchcomments);
      return searchcomments;
    },
    saveCommentsData: function(results) {
      console.log(results);
      searchcomments = results;
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
		case(CommentConstants.GETCOMMENT):
      console.log(payload.action.commentdata);
      CommentStore.saveCommentsData(payload.action.commentdata);
      CommentStore.emitChange();
      break;
	}
});

module.exports = CommentStore;
