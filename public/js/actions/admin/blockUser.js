var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var BlockActions = {
  block: function (credentials) {
    console.log(credentials);
    $.post('/admin-api/blockuser', credentials, function (data) {
      if (data.status === 201) {
        location.reload(true);
      }
    });

  },
};

module.exports = BlockActions;
