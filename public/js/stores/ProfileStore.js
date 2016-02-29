var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var user = [];
var pic = '';

var ProfileStore = assign({}, EventEmitter.prototype, {
  saveuserdata: function (data) {
    user.push(data);
  },

  saveprofilepic: function (data) {
    pic = data;
  },

  getuserdata: function () {
    console.log(user[0]);
    if (user.length == 0) {
      return {
        firstname: '',
        lastname: '',
        country: '',
        username: '',
      };
    }

    return {
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      country: user[0].country,
      username: user[0].username,
    };
  },

  getprofilepic: function () {
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
      ProfileStore.saveuserdata(payload.action.userdata);
      ProfileStore.emitChange();
      break;
    case (ProfileConstants.PROFILEPIC):
      ProfileStore.saveprofilepic(payload.action.profilepic);
      ProfileStore.emitChange();
      break;
  }
});

module.exports = ProfileStore;

