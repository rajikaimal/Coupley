var AppDispatcher = require('../dispatcher/AppDispatcher');
var NameConstants = require('../constants/NameConstants');
var TodoStore = require('../stores/NameStore');

var StarterActions = {
  create: function(text) {
    console.log('Action');
    AppDispatcher.handleViewAction({
      actionType: TodoConstants.TODO_CREATE,
      item: text
    }); 
  }
};

module.exports = StarterActions;
