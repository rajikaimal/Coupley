var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var UnblockActions = {
    Unblock: function (credentials) {
        console.log(credentials);
        $.post('/admin-api/unblockuser', credentials, function (data) {
            if (data.status === 201) {

            }
        });

        setTimeout(document.location = "/cp-admin#/users/enemies", 2000);
    }
};

module.exports = UnblockActions;