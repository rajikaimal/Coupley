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
        switch (data.category[0].category) {
          case 'timeline':
            $.get('/admin-api/timeline', function (response) {
              if (response.status == 200) {
                AppDispatcher.handleViewAction({
                  actionType: FeedConstants.SEARCH,
                  timelineFeed: response.feeds,
                });
              }      else if (response.status === 300) {
                swal('Something Went Wrong', 'Please try again in a moment', 'error');
              }
            });

            break;
          case 'activity':
            $.get('/admin-api/activity', function (response) {
              if (response.status == 200) {
                AppDispatcher.handleViewAction({
                  actionType: FeedConstants.SEARCH,
                  timelineFeed: response.feeds,
                });
              }      else if (response.status === 300) {
                swal('Something Went Wrong', 'Please try again in a moment', 'error');
              }
            });

            break;
          case 'privacy':
            $.get('/admin-api/privacy', function (response) {
              if (response.status == 200) {
                AppDispatcher.handleViewAction({
                  actionType: FeedConstants.SEARCH,
                  timelineFeed: response.feeds,
                });
              }      else if (response.status === 300) {
                swal('Something Went Wrong', 'Please try again in a moment', 'error');
              }
            });

            break;
          case 'chat':
            $.get('/admin-api/chat', function (response) {
              if (response.status == 200) {
                AppDispatcher.handleViewAction({
                  actionType: FeedConstants.SEARCH,
                  timelineFeed: response.feeds,
                });
              }      else if (response.status === 300) {
                swal('Something Went Wrong', 'Please try again in a moment', 'error');
              }
            });

            break;
          case 'other':
            $.get('/admin-api/others', function (response) {
              if (response.status == 200) {
                AppDispatcher.handleViewAction({
                  actionType: FeedConstants.SEARCH,
                  timelineFeed: response.feeds,
                });
              }      else if (response.status === 300) {
                swal('Something Went Wrong', 'Please try again in a moment', 'error');
              }
            });

            break;

        }
      } else if (data.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });

  },

  timelineFeeds: function () {
    $.get('/admin-api/timeline', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: FeedConstants.SEARCH,
          timelineFeed: response.feeds,
        });
      }      else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

  activityFeeds: function () {
    $.get('/admin-api/activity', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: FeedConstants.SEARCH,
          timelineFeed: response.feeds,
        });
      }      else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

  privacyFeeds: function () {
    $.get('/admin-api/privacy', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: FeedConstants.SEARCH,
          timelineFeed: response.feeds,
        });
      }      else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

  chatFeeds: function () {
    $.get('/admin-api/chat', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: FeedConstants.SEARCH,
          timelineFeed: response.feeds,
        });
      }      else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

  otherFeeds: function () {
    $.get('/admin-api/others', function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
          actionType: FeedConstants.SEARCH,
          timelineFeed: response.feeds,
        });
      }      else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

};

module.exports = FeedActions;
