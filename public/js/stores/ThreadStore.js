var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ThreadConstants = require('../constants/ThreadConstants');
var assign = require('object-assign');

var CHAT_EVENT = 'change';

var Thread = [];
var PreviousThread = [];

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
         console.log("Badu awa :D");
         console.log(PreviousThread);

    },
    savepreviousmessage:function(results){
         console.log(results);
         PreviousThread=results;
    }

});

AppDispatcher.register(function (payload) {
    console.log('payload');
    console.log(payload);
    switch (payload.action.actionType) {
        case(ThreadConstants.RETRIVEOLD):
        console.log("hello ooooooooooooooooooooooooooooooooooo");
        console.log(payload.action.previousmessage);
            ThreadStore.savepreviousmessage(payload.action.previousmessage);
            console.log("Badu awa :D 1");
            ThreadStore.emitChange();
            break;

    }
});

module.exports = ThreadStore;
