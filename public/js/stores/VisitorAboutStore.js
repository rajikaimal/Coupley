var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var summary;
var life;
var goodat;
var spendtime;
var favs;
var lookingfor;

var AboutStore = assign({}, EventEmitter.prototype, {
  saveAll: function (data) {
    summary = data.selfsummary;
    life = data.life;
    goodat = data.goodat;
    spendtime = data.thinkingof;
    favs = data.favourites;
  },

  saveLookingFor: function (data) {
    lookingfor = data;
  },

  getLookingFor: function () {
    return lookingfor;
  },

  getSummary: function () {
    return summary;
  },

  getLife: function () {
    return life;
  },

  getGoodAt: function () {
    return goodat;
  },

  getSpendTime: function () {
    return spendtime;
  },

  getFavs: function () {
    return favs;
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
    case (ProfileConstants.VISITORABOUTLOAD):
      AboutStore.saveAll(payload.action.data);
      AboutStore.emitChange();
      break;
    case (ProfileConstants.LOOKINGFOR):
      AboutStore.saveLookingFor(payload.action.lookingfor);
      AboutStore.emitChange();
      break;
  }
});

module.exports = AboutStore;
