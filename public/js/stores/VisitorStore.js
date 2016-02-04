var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var visitor = {};
var likestatus;
var likedbackstatus;
var blockstatus;
var permission;

var VisitorStore = assign({}, EventEmitter.prototype, {
  savepermission: function(data) {
    console.log('INIDIDE SOTER'+ data);
    permission = data;
  },
  saveuserdata: function(data) {
    visitor = data;
  },
  savelikestatus: function(data) {
    likestatus = data;
  },
  savelikedbackstatus: function(data) {
    likedbackstatus = data;
  },
  saveblockstatus: function(data) {
    console.log('STORE :: changing status ' + data);
    blockstatus = data;
  },
  getpermission: function() {
    return permission;
  },
  getblockstatus: function() {
    return blockstatus;
  },
  getlikedbackstatus: function() {
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
    case(ProfileConstants.PROPPERMISSION):
      VisitorStore.savepermission(payload.action.permission);
      VisitorStore.emitChange();
      break;
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
    case(ProfileConstants.BLOCKSTATUS):
      VisitorStore.saveblockstatus(payload.action.blockstatus);
      VisitorStore.emitChange();
      break;
  }
});

module.exports = VisitorStore;