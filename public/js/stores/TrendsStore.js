var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TrendConstants = require('../constants/TrendConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var TrendsList = [];
var TrendsSearchList = [];
var TrendsSearchPost=[];
var TrendsInitialSearchPost=[];

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

  saveTrendsSearchPost:function (results) {
    TrendsSearchPost = results;
  },

   getTrendsSearchPost:function () {
     return TrendsSearchPost;
  },

  saveFirstTrendsSearchPost:function (results) {
    TrendsInitialSearchPost = results;
  },

   getFirstTrendsSearchPost:function () {
     return TrendsInitialSearchPost;
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
        case (TrendConstants.SEARCHTRENDPOSTS):
            TrendsStore.saveTrendsSearchPost(payload.action.listofposttrends);
            TrendsStore.emitChange();
            break;
        case (TrendConstants.INITIALSEARCHTRENDPOSTS):
            TrendsStore.saveFirstTrendsSearchPost(payload.action.listofinitialposttrends);
            TrendsStore.emitChange();
            break;




    }




});

module.exports = TrendsStore;
