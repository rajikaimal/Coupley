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

	getTrendsSearchList:function (request) {
		$.get('/api/gettrendssearchlist?trend='+request.trend, function (response) {
			if (response.status == 200) {
				AppDispatcher.handleViewAction({
						actionType:TrendConstants.SEARCHTRENDS,
						listofsearchtrends: response.stlist,
					});
			}else if (response.status == 505) {
				console.log('Error 505');
			}
		});
	},

	getTrendsSearchPosts:function (request) {
		$.get('/api/gettrendssearchpost?strend='+request.strend, function (response) {
			console.log(response);
			if (response.status == 200) {
				AppDispatcher.handleViewAction({
						actionType:TrendConstants.SEARCHTRENDPOSTS,
						listofposttrends: response.trendposts,
					});
			}else if (response.status == 505) {
				console.log('Error 505');
			}
		});
	},

	getTrendsInitialSearchPosts:function () {
		$.get('/api/gettrendsinitialsearchpost', function (response) {
			console.log(response);
			if (response.status == 200) {
				AppDispatcher.handleViewAction({
						actionType:TrendConstants.INITIALSEARCHTRENDPOSTS,
						listofinitialposttrends: response.inittrendposts,
					});
			}else if (response.status == 505) {
				console.log('Error 505');
			}
		});
	},



};


module.exports = TrendsAction;
