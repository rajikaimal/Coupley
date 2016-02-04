var AppDispatcher = require('../../dispatcher/AppDispatcher');
var RegisterConstants = require('../../constants/RegisterConstants');

var BlockActions = {
    block: function (credentials) {
        console.log(credentials);
        $.post('/admin-api/blockuser', credentials, function (data) {
            if (data.status === 201) {

            }
        });

        setTimeout(document.location = "/cp-admin#/users/friends", 1000);
    }
};


module.exports = BlockActions;