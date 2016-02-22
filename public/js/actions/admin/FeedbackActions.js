/**
 * Created by Isuru 1 on 27/01/2016.
 */
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var LoginConstants = require('../../constants/LoginConstants');
var FeedConstants = require('../../constants/FeedConstants');

var FeedActions = {
    MarkAsDone: function (credentials) {

        $.post('/admin-api/markfeed', credentials, function (data) {
            if (data.status === 201) {

            }
        });

        document.location = "/cp-admin#/feedback/";
    }
    ,
    timelineFeeds: function () {
        $.get('/admin-api/timeline', function (response) {
            if (response.status == 200) {
                AppDispatcher.handleViewAction({
                    actionType: FeedConstants.SEARCH,
                    timelineFeed: response.feeds
                });
            }
            else if (response.status == 505) {
                console.log('Error 505');

            }
        });
    }
    ,
    activityFeeds: function () {
        $.get('/admin-api/activity', function (response) {
            if (response.status == 200) {
                AppDispatcher.handleViewAction({
                    actionType: FeedConstants.SEARCH,
                    timelineFeed: response.feeds
                });
            }
            else if (response.status == 505) {
                console.log('Error 505');

            }
        });
    }
    ,
    privacyFeeds: function () {
        $.get('/admin-api/privacy', function (response) {
            if (response.status == 200) {
                AppDispatcher.handleViewAction({
                    actionType: FeedConstants.SEARCH,
                    timelineFeed: response.feeds
                });
            }
            else if (response.status == 505) {
                console.log('Error 505');

            }
        });
    },
    chatFeeds: function () {
        $.get('/admin-api/chat', function (response) {
            if (response.status == 200) {
                AppDispatcher.handleViewAction({
                    actionType: FeedConstants.SEARCH,
                    timelineFeed: response.feeds
                });
            }
            else if (response.status == 505) {
                console.log('Error 505');

            }
        });
    },
    otherFeeds: function () {
        $.get('/admin-api/others', function (response) {
            if (response.status == 200) {
                AppDispatcher.handleViewAction({
                    actionType: FeedConstants.SEARCH,
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
