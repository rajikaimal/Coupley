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
  saveall: function(data) {
    summary = data.selfsummary;
    life = data.life;
    goodat = data.goodat;
    spendtime = data.thinkingof;
    favs = data.favourites;
  },
  savesummary: function(data) {
    summary = data;
  },
  getsummary: function() {
    return summary;
  },
  savelife: function(data) {
    life = data;
  },
  getlife: function() {
    return life;
  },
  savegoodat: function(data) {
    goodat = data;
  },
  getgoodat: function() {
    return goodat;
  },
  savespendtime: function(data) {
    spendtime = data;
  },
  getspendtime: function() {
    return spendtime;
  },
  savefavs: function(data) {
    favs = data;
  },
  getfavs: function() {
    return favs;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  console.log('Got payload' + payload);
  switch(payload.action.actionType) {
    case(AboutConstants.FETCH):
      AboutStore.saveall(payload.action.data);
      AboutStore.emitChange();
      break;
    case(AboutConstants.SUMMARY):
      AboutStore.savesummary(payload.action.summary);
      AboutStore.emitChange();
      break;
    case(AboutConstants.LIFE):
      AboutStore.savelife(payload.action.life);
      AboutStore.emitChange();
      break;
    case(AboutConstants.GOODAT):
      AboutStore.savegoodat(payload.action.goodat);
      AboutStore.emitChange();
      break;
    case(AboutConstants.THINKING):
      AboutStore.savespendtime(payload.action.thinkingof);
      AboutStore.emitChange();
      break;
    case(AboutConstants.FAVS):
      AboutStore.savefavs(payload.action.favs);
      AboutStore.emitChange();
      break;
  }
});

module.exports = AboutStore;