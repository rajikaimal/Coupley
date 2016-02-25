var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../../constants/ProfileConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var admin = [];

var ProfileStore = assign({}, EventEmitter.prototype, {
  saveuserdata: function (data) {
    admin.push(data);
  },

  getuserdata: function () {
    console.log(admin[0]);
    if (admin.length == 0) {
      return {
        id:'',
        firstname: '',
        lastname: '',
        job:'',
        email:'',
        created_at:'',

      };
    }

    return {
      id: admin[0].id,
      firstname: admin[0].firstname,
      lastname: admin[0].lastname,
      job:admin[0].job,
      email:admin[0].email,
      created_at:admin[0].created_at,
    };
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
    console.log('cahnged dude');
  },
});

AppDispatcher.register(function (payload) {
  console.log('pay');
  switch (payload.action.actionType) {
    case (ProfileConstants.GETDATA):
      console.log('emit');

      ProfileStore.saveuserdata(payload.action.userdata);
      console.log(payload.action.userdata);
      ProfileStore.emitChange();
      console.log('change');
      break;

  }
});

module.exports = ProfileStore;
