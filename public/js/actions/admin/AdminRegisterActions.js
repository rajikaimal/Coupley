var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var RegisterActions = {
    checks: function (credentials) {
        console.log(credentials);
        $.post('/admin-api/registerAdmin', credentials, function (data) {
            if (data.status === 201) {

            }
        });
        document.location = "/cp-admin#/settings";
    },
    register: function (credentials) {
        console.log('Action register');

        document.location = "/cp-admin#/settings";
    }
};

module.exports = RegisterActions;