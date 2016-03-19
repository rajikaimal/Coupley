var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LikeConstants = require('../constants/LikeListConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var list = [];
var listMe = [];
var backList = [];

var tempList = [];
var tempListMe = [];
var tempBackList = [];

var LikeStore = assign({}, EventEmitter.prototype, {
  saveList: function (data) {
    console.log('saving list' + data);
    list = data;
    tempList = data;
  },

  saveListMe: function (data) {
    console.log('<><>saving likeme list' + data);
    listMe = data;
    tempListMe = data;
  },

  saveBackList: function (data) {
    backList = data;
    tempBackList = data;
  },

  searchLikedMe: function (value) {
    list = [];
    tempList.map(function (item) {
      let fullname = item.firstname + ' ' + item.lastname;
      if (item.firstname.toLowerCase().startsWith(value.toLowerCase()) || item.lastname.toLowerCase().startsWith(value.toLowerCase()) || fullname.toLowerCase().startsWith(value.toLowerCase())) {
        list.push(item);
      }
    });
  },

  searchGotLiked: function (value) {
    listMe = [];
    tempListMe.map(function (item) {
      let fullname = item.firstname + ' ' + item.lastname;
      if (item.firstname.toLowerCase().startsWith(value.toLowerCase()) || item.lastname.toLowerCase().startsWith(value.toLowerCase()) || fullname.toLowerCase().startsWith(value.toLowerCase())) {
        console.log('Found one ');
        listMe.push(item);
      }
    });
  },

  searchLikedBack: function(value) {
    backList = [];
    tempBackList.map(function (item) {
      let fullname = item.firstname + ' ' + item.lastname;
      if (item.firstname.toLowerCase().startsWith(value.toLowerCase()) || item.lastname.toLowerCase().startsWith(value.toLowerCase()) || fullname.toLowerCase().startsWith(value.toLowerCase())) {
        backList.push(item);
      }
    });
  },

  getLikedBackList: function () {
    return backList;
  },

  getListMe: function () {
    return listMe;
  },

  getList: function () {
    return list;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register(function (payload) {
  console.log('payload');
  console.log(payload);
  switch (payload.action.actionType) {
    case (LikeConstants.LIKESLIST):
      LikeStore.saveList(payload.action.likeslist);
      LikeStore.emitChange();
      break;
    case (LikeConstants.LIKESLISTME):
      console.log('Saving like me list !!!');
      console.log('Saving like list me stuff !');
      LikeStore.saveListMe(payload.action.likeslist);
      LikeStore.emitChange();
      break;
    case (LikeConstants.LIKEDBACKLIST):
      LikeStore.saveBackList(payload.action.likeslist);
      LikeStore.emitChange();
      break;
    case (LikeConstants.SEARCHLIKEDME):
      LikeStore.searchLikedMe(payload.action.search);
      LikeStore.emitChange();
      break;
    case (LikeConstants.SEARCHGOTLIKED):
      LikeStore.searchGotLiked(payload.action.search);
      LikeStore.emitChange();
      break;
    case (LikeConstants.SEARCHLIKEDBACK):
      LikeStore.searchLikedBack(payload.action.search);
      LikeStore.emitChange();
      break;
  }
});

module.exports = LikeStore;
