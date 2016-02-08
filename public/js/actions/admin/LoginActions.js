var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');

var AdminLoginActions = {
    login: function (credentials) {
        console.log('Action login');
        $.post('/admin-api/authenticates', credentials, function (response) {
            if (response.token) {
                AppDispatcher.handleViewAction({
                    actionType: LoginConstants.LOGIN,
                    token: response.token
                });
                console.log('Dispatched');
                //document.location = "/cp-admin#dashboard";
                swal("Welcome Back!", "Login Successful.", "success");
            }
            else {
                console.log(response);
            }

        }).fail(function () {
            document.getElementById('server-error').innerHTML = "*Invalid credentials";
        });

    },
    resetpassword: function (email) {
        $.post('/admin-api/recoverpwd', email, function (response) {
            if (response.status === 201) {
                swal("Error", "Your email doesnt exists in the system.", "error");
            }

            else {

                swal("Check your mail!", "New password has been sent to you email.", "success");
            }
        });
    }
};

module.exports = AdminLoginActions;