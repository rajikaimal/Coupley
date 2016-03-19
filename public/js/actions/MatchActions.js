var AppDispatcher = require('../dispatcher/AppDispatcher');
var MatchConstants = require('../constants/MatchConstants');

var LoginActions = {
  save: function () {
    $.post('/api/quizresults?email=' + localStorage.getItem('email') + '&', function (response) {

    });
  },
};

module.exports = LoginActions;
