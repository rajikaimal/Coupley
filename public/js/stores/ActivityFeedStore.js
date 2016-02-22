var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var feed = [];

var ActivityFeedStore = assign({}, EventEmitter.prototype, {
    savefeed: function (data) {
        feed = data;
        console.log('SAVED');
        console.log(feed.length);
        console.log(typeof feed);
    },
    getfeed: function () {
        return feed;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (payload) {
    console.log('Got payload' + payload);
    switch (payload.action.actionType) {
        case(ProfileConstants.FEED):
            ActivityFeedStore.savefeed(payload.action.feed);
            ActivityFeedStore.emitChange();
            break;
    }
});

module.exports = ActivityFeedStore;