var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LikeConstants = require('../constants/LikeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var list = [];
var listMe = [];
var backList = [];

var LikeStore = assign({}, EventEmitter.prototype, {
  saveList: function (data) {
    console.log('saving list' + data);
    list = data;
  },

  saveListMe: function (data) {
    console.log('<><>saving likeme list' + data);
    listMe = data;
  },

  saveBackList: function(data) {
    backList = data;
  },

  getLikedBackList: function() {
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
    case ('LIKESLISTME'):
      console.log('Saving like me list !!!');
      console.log('Saving like list me stuff !');
      LikeStore.saveListMe(payload.action.likeslist);
      LikeStore.emitChange();
      break;
    case ('LIKEDBACKLIST'):
      LikeStore.saveBackList(payload.action.likeslist);
      LikeStore.emitChange();
      break;
  }
});

module.exports = LikeStore;
