var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ThreadConstants = require('../constants/ThreadConstants');
var assign = require('object-assign');

var CHAT_EVENT = 'change';

var Thread = [];
var PreviousThread = [];
var LikedUsers = [];

var ThreadStore = assign({}, EventEmitter.prototype, {

    getmessages: function () {
        return Thread;
    },
    savemessage: function (data) {
        Thread.push(data);
    },
    emitChange: function () {
        this.emit(CHAT_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHAT_EVENT, callback);
    },
    getpreviousmessage:function(){
         return PreviousThread;

    },
    savepreviousmessage:function(results){
         PreviousThread=results;
    },
    savelikedusers:function(results){
         LikedUsers=results;
    },
    getlikedusers:function(){
         return LikedUsers;

    },

});

AppDispatcher.register(function (payload) {
    switch (payload.action.actionType) {
        case(ThreadConstants.RETRIVEOLD):
            ThreadStore.savepreviousmessage(payload.action.previousmessage);
            ThreadStore.emitChange();
            break;
        case(ThreadConstants.RETRIVELIKED):
            ThreadStore.savelikedusers(payload.action.llist);
            ThreadStore.emitChange();
            break;

    }
});

module.exports = ThreadStore;
