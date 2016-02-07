/**
 * Created by Isuru 1 on 27/01/2016.
 */
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');
var SearchConstants = require('../../constants/SearchConstants');

var FeedActions = {

    timelineFeed: function () {
        $.get('/admin-api/timeline', function (response) {
            if (response.status == 200) {
                AppDispatcher.handleViewAction({
                    actionType: SearchConstants.SEARCH,
                    timelineFeed: response.feeds
                });
            }
            else if (response.status == 505) {
                console.log('Error 505');

            }
        });
    }


};

module.exports = FeedActions;
