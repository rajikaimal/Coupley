var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AboutConstants = require('../constants/AboutConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var summary;
var life;
var goodat;
var spendtime;
var favs;

var AboutStore = assign({}, EventEmitter.prototype, {
  saveAll: function (data) {
    summary = data.selfsummary;
    life = data.life;
    goodat = data.goodat;
    spendtime = data.thinkingof;
    favs = data.favourites;
  },

  saveSummary: function (data) {
    summary = data;
  },

  getSummary: function () {
    return summary;
  },

  saveLife: function (data) {
    life = data;
  },

  getLife: function () {
    return life;
  },

  saveGoodAt: function (data) {
    goodat = data;
  },

  getGoodAt: function () {
    return goodat;
  },

  saveSpendTime: function (data) {
    spendtime = data;
  },

  getSpendTime: function () {
    return spendtime;
  },

  saveFavs: function (data) {
    favs = data;
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
    case (AboutConstants.FETCH):
      AboutStore.saveAll(payload.action.data);
      AboutStore.emitChange();
      break;
    case (AboutConstants.SUMMARY):
      AboutStore.saveSummary(payload.action.summary);
      AboutStore.emitChange();
      break;
    case (AboutConstants.LIFE):
      AboutStore.saveLife(payload.action.life);
      AboutStore.emitChange();
      break;
    case (AboutConstants.GOODAT):
      AboutStore.saveGoodAt(payload.action.goodat);
      AboutStore.emitChange();
      break;
    case (AboutConstants.THINKING):
      AboutStore.saveSpendTime(payload.action.thinkingof);
      AboutStore.emitChange();
      break;
    case (AboutConstants.FAVS):
      AboutStore.saveFavs(payload.action.favs);
      AboutStore.emitChange();
      break;
  }
});

module.exports = AboutStore;
