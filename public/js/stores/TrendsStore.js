var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TrendConstants = require('../constants/TrendConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var TrendsList = [];
var TrendsSearchList = [];

var TrendsStore = assign({}, EventEmitter.prototype, {


  emitChange: function () {
      this.emit(CHANGE_EVENT);
    },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  savetrendslist:function (results) {
    TrendsList = results;
  },

   gettrendslist:function () {
     return TrendsList;
  },

  saveTrendsSearchList:function (results) {
    TrendsSearchList = results;
  },

   getTrendsSearchList:function () {
     return TrendsSearchList;
  },

});

AppDispatcher.register(function (payload) {

    switch (payload.action.actionType) {
    	 case (TrendConstants.ALLTRENDS):
            TrendsStore.savetrendslist(payload.action.listoftrends);
            TrendsStore.emitChange();
            break;
       case (TrendConstants.SEARCHTRENDS):
            TrendsStore.saveTrendsSearchList(payload.action.listofsearchtrends);
            TrendsStore.emitChange();
            break;




    }




});

module.exports = TrendsStore;
