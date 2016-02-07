var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../../constants/SearchConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Results = [];

var Store = assign({}, EventEmitter.prototype, {
    getresults: function () {
        return Results;
    },
    saveresults: function (results) {
        Results = results;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (payload) {
    switch (payload.action.actionType) {
        case(SearchConstants.SEARCH):
            console.log(payload.action.timelineFeed);
            Store.saveresults(payload.action.timelineFeed);
            Store.emitChange();
            break;

    }
});

module.exports = Store;