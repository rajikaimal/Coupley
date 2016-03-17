var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var UpdateInfo = {
  update: function (data) {
    $.post('/api/profile/updatemain?token=' + localStorage.getItem('apitoken'), data, function (response) {
      console.log('response' + response.done);
      if (response.status === 200 && response.done == true) {
        window.location = "/#/profile/activityfeed";
      }
    });
  },
};

module.exports = UpdateInfo;
