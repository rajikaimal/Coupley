var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var VisitConstants = require('../constants/VisitConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var MyVisitList=[];
var OthersVisitList=[];

var VisitsStore = assign({}, EventEmitter.prototype, {


  emitChange: function () {
      this.emit(CHANGE_EVENT);
    },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  saveMyVisitList:function (results) {
    MyVisitList = results;
  },

   getMyVisitList:function () {
     return MyVisitList;
  },

  // saveMySearchVisitList:function (results) {
  //   MySearchVisitList = results;
  // },
  //
  //  getMySearchVisitList:function () {
  //    return MySearchVisitList;
  // },

  saveOthersVisitList:function (results) {
    OthersVisitList = results;
  },

   getOthersVisitList:function () {
     return OthersVisitList;
  },

  // saveOthersSearchVisitList:function (results) {
  //   OthersSearchVisitList = results;
  // },
  //
  //  getOthersSearchVisitList:function () {
  //    return OthersSearchVisitList;
  // },


});

AppDispatcher.register(function (payload) {

    switch (payload.action.actionType) {
    	 case (VisitConstants.MYVISITS):
            VisitsStore.saveMyVisitList(payload.action.myVisitlist);
            VisitsStore.emitChange();
            break;
       case (VisitConstants.SEARCHMYVISITS):
            VisitsStore.saveMyVisitList(payload.action.myVisitSearchlist);
            VisitsStore.emitChange();
            break;
       case (VisitConstants.OTHERSVISITSS):
            VisitsStore.saveOthersVisitList(payload.action.othersVisitlist);
            VisitsStore.emitChange();
            break;
       case (VisitConstants.SEARCHOTHERSVISITSS):
            VisitsStore.saveOthersVisitList(payload.action.othersVisitSearchlist);
            VisitsStore.emitChange();
            break;



    }




});

module.exports = VisitsStore;
