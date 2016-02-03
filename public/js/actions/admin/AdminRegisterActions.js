var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var RegisterActions = {
    checks: function (credentials) {
        console.log(credentials);
        $.post('/admin-api/registerAdmin', credentials, function (data) {

            if (data.status === 201) {
                swal("Good job!", "New Administrator added to the system", "success")
            }

            else {
                swal("Error","An account with the same email exists already", "error");
            }
        }).fail(function () {
            swal("Error","An account with the same email exists already", "error");
        });

        document.location = "/cp-admin#/settings";
    },
    register: function (credentials) {
        console.log('Action register');

        document.location = "/cp-admin#/settings";
    }
};

module.exports = RegisterActions;