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
var image;
var done = false;

var VisitorStore = assign({}, EventEmitter.prototype, {
  savePermission: function (data) {
    permission = data;
  },

  saveUserData: function (data) {
    visitor = data;
  },

  saveLikeStatus: function (data) {
    likestatus = data;
  },

  saveLikeBackStatus: function (data) {
    likedbackstatus = data;
  },

  saveBlockStatus: function (data) {
    blockstatus = data;
  },

  saveProfilePic: function (data) {
    image = data;
  },

  clear: function () {
    visitor = [];
  },

  saveDoneStatus: function (data) {
    alert(done);
    done = data;
    setTimeout(function () {
      done = false;
    }, 1000);
  },

  getDoneStatus: function () {
    return done;
  },

  getPermission: function () {
    return permission;
  },

  getBlockStatus: function () {
    return blockstatus;
  },

  getLikedbackStatus: function () {
    return likedbackstatus;
  },

  getLikeStatus: function () {
    return likestatus;
  },

  getUserData: function () {
    return visitor;
  },

  removeuserdata: function () {
    visitor = {};
  },

  getProfilePic: function () {
    return image;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function (payload) {
  switch (payload.action.actionType) {
    case (ProfileConstants.PROPPERMISSION):
      VisitorStore.savePermission(payload.action.permission);
      VisitorStore.emitChange();
      break;
    case (ProfileConstants.LIKESTATUS):
      VisitorStore.saveLikeStatus(payload.action.likestatus);
      VisitorStore.emitChange();
      break;
    case (ProfileConstants.LIKEBACKSTATUS):
      VisitorStore.saveLikeBackStatus(payload.action.likedbackstatus);
      VisitorStore.emitChange();
      break;
    case (ProfileConstants.VISITOR):
      VisitorStore.saveUserData(payload.action.userdata);
      VisitorStore.emitChange();
      break;
    case (ProfileConstants.VISITORREMOVE):
      VisitorStore.saveUserData(payload.action.userdata);
      VisitorStore.emitChange();
      break;
    case (ProfileConstants.BLOCKSTATUS):
      VisitorStore.saveBlockStatus(payload.action.blockstatus);
      VisitorStore.emitChange();
      break;
    case (ProfileConstants.VISITORPROFILEPIC):
      VisitorStore.saveProfilePic(payload.action.profilepic);
      VisitorStore.emitChange();
      break;
    case (ProfileConstants.CLEAR):
      VisitorStore.clear();
      VisitorStore.emitChange();
      break;
    case (ProfileConstants.REPORTDONE):
      VisitorStore.saveDoneStatus(payload.action.done);
      VisitorStore.emitChange();
      break;
  }
});

module.exports = VisitorStore;
