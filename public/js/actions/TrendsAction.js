var AppDispatcher = require('../dispatcher/AppDispatcher');
var TrendConstants = require('../constants/TrendConstants');


var TrendsAction = {

	getTrendsList:function () {
    $.get('/api/gettrendslist', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType:TrendConstants.ALLTRENDS,
            listoftrends: response.tlist,
          });
      }else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  

};


module.exports = TrendsAction;