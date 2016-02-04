var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var visitor = {};
var likestatus;
var likedbackstatus;

var VisitorStore = assign({}, EventEmitter.prototype, {
  saveuserdata: function(data) {
    visitor = data;
  },
  savelikestatus: function(data) {
    likestatus = data;
  },
  savelikedbackstatus: function(data) {
    console.log('DATA FROM VISITOR SOTRE' + data);
    likedbackstatus = data;
    console.log("LIKEDBACK <><><><><><>" + likedbackstatus);
  },
  getlikedbackstatus: function() {
    console.log("RETURNUNG BACJ" + likedbackstatus);
    return likedbackstatus;
  },
  getlikestatus: function() {
    return likestatus;
  },
  getuserdata: function() {
    return visitor;
  },
  removeuserdata: function() {
    visitor = {};
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
    case(ProfileConstants.LIKESTATUS):
      VisitorStore.savelikestatus(payload.action.likestatus);
      VisitorStore.emitChange();
      break;
    case(ProfileConstants.LIKEBACKSTATUS):
      VisitorStore.savelikedbackstatus(payload.action.likedbackstatus);
      VisitorStore.emitChange();
      break;
    case(ProfileConstants.VISITOR):
      VisitorStore.saveuserdata(payload.action.userdata);
      VisitorStore.emitChange();
      break;
    case(ProfileConstants.VISITORREMOVE):
      VisitorStore.saveuserdata(payload.action.userdata);
      VisitorStore.emitChange();
      break;
  }
});

module.exports = VisitorStore;