var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var user = [];
var pic = '';
var error = false;
var done = false;
var blocklist = [];
var photoPaths = [];

var temp;

var ProfileStore = assign({}, EventEmitter.prototype, {
  saveUserData: function (data) {
    
    //user.push(data);
    temp = data;
  },

  saveProfilePic: function (data) {
    pic = data;
  },

  saveErrorStatus: function (data) {
    error = data;
    setTimeout(function () {
      error = false;
    }, 1000);
  },

  saveDoneStatus: function (data) {
    done = data;
    setTimeout(function () {
      done = false;
    }, 1000);
  },

  saveBlockList: function (data) {
    blocklist = data;
  },

  savePhotos: function(data) {
    photoPaths = data;
  },

  getPhotos: function() {
    return photoPaths;
  },

  getBlockList: function () {
    return blocklist;
  },

  getDoneStatus: function () {
    return done;
  },

  getErrorStatus: function () {
    return error;
  },

  getUserData: function () {
    // if (user.length == 0) {
    //   return {
    //     firstname: '',
    //     lastname: '',
    //     country: '',
    //     username: '',
    //     age: '',
    //     birthday: '',
    //   };
    // }
    if(temp != undefined ) {
    
      return {
        firstname: temp.firstname,
        lastname: temp.lastname,
        country: temp.country,
        username: temp.username,
        orientation: temp.orientation,
        age: temp.age,
        birthday: temp.birthday,
      };  
    }
    return {};
    
  },

  getAll: function() {
    console.
    console.log(user[0])
    return user[0];
  },

  getProfilePic: function () {
    return pic;
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
    case (ProfileConstants.GETDATA):
      ProfileStore.saveUserData(payload.action.userdata);
      ProfileStore.emitChange();
      break;
    case (ProfileConstants.PROFILEPIC):
      ProfileStore.saveProfilePic(payload.action.profilepic);
      ProfileStore.emitChange();
      break;
    case (ProfileConstants.BLOCKLIST):
      ProfileStore.saveBlockList(payload.action.list);
      ProfileStore.emitChange();
      break;
    case (ProfileConstants.PROFPHOTOS):
      ProfileStore.savePhotos(payload.action.photos);
      ProfileStore.emitChange();
      break;
    case (ProfileConstants.ERR):
      ProfileStore.saveErrorStatus(payload.action.error);
      ProfileStore.emitChange();
      break;
    case (ProfileConstants.DONE):
      ProfileStore.saveDoneStatus(payload.action.done);
      ProfileStore.emitChange();
      break;

  }
});

module.exports = ProfileStore;

