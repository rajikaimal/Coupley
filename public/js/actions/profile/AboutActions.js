var AppDispatcher = require('../../dispatcher/AppDispatcher');
var AboutConstants = require('../../constants/AboutConstants');

var AboutActions = {
  fetchAll: function () {
    $.get('/api/profile/about?token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email'), function (response) {
      if (response.status === 200) {
        AppDispatcher.handleViewAction({
          actionType: AboutConstants.FETCH,
          data: response.data[0],
        });
      } else {

      }

    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.FETCH,
        error: true,
      });
    });
  },

  fetchLookingFor: function () {
    $.get('/api/profile/lookingfor?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username'), function (response) {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.LOOKINGFOR,
        lookingfor: response.data[0],
      });
    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.FETCH,
        error: true,
      });
    });
  },

  updateSummary: function (summary) {
    $.ajax({
      url: '/api/profile/edit/summary?token=' + localStorage.getItem('apitoken'),
      type: 'PUT',
      data: 'email=' + localStorage.getItem('email') + '&summary=' + summary,
      success: function (response) {
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.SUMMARY,
            summary: summary,
          });
        } else {

        }
      },
    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.SUMMARY,
        error: true,
      });
    });
  },

  updateLife: function (life) {
    $.ajax({
      url: '/api/profile/edit/life?token=' + localStorage.getItem('apitoken'),
      type: 'PUT',
      data: 'token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email') + '&life=' + life,
      success: function (response) {
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.LIFE,
            life: life,
          });
        } else {

        }
      },
    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.LIFE,
        error: true,
      });
    });;
  },

  updateGoodAt: function (goodat) {
    $.ajax({
      url: '/api/profile/edit/goodat?token=' + localStorage.getItem('apitoken'),
      type: 'PUT',
      data: 'token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email') + '&goodat=' + goodat,
      success: function (response) {
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.GOODAT,
            goodat: goodat,
          });
        } else {

        }
      },
    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.GOODAT,
        error: true,
      });
    });;
  },

  updateThinkingOf: function (thinkingof) {
    $.ajax({
      url: '/api/profile/edit/thinkingof?token=' + localStorage.getItem('apitoken'),
      type: 'PUT',
      data: 'email=' + localStorage.getItem('email') + '&thinkingof=' + thinkingof,
      success: function (response) {
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.THINKING,
            thinkingof: thinkingof,
          });
        } else {

        }
      },
    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.THINKING,
        error: true,
      });
    });;
  },

  updateFavs: function (favs) {
    $.ajax({
      url: '/api/profile/edit/favs?token=' + localStorage.getItem('apitoken'),
      type: 'PUT',
      data: 'email=' + localStorage.getItem('email') + '&favs=' + favs,
      success: function (response) {
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.FAVS,
            favs: favs,
          });
        } else {

        }
      },
    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.FAVS,
        error: true,
      });
    });;
  },

  updateLookingFor: function (data) {
    $.ajax({
      url: '/api/profile/lookingfor?token=' + localStorage.getItem('apitoken'),
      type: 'PUT',
      data: 'username=' + localStorage.getItem('username') + '&location=' + data.location + '&minage=' + data.minage + '&maxage=' + data.maxage + '&relstatus=' + data.relstatus + '&shortterm=' + data.shortterm + '&longterm=' + data.longterm + '&casualsex=' + data.casualsex,
      success: function (response) {
        console.log(response);
        if (response.status === 200) {
          $.get('/api/profile/lookingfor?token=' + localStorage.getItem('apitoken') + '&username=' + localStorage.getItem('username'), function (response) {
            AppDispatcher.handleViewAction({
              actionType: AboutConstants.LOOKINGFOR,
              lookingfor: response.data[0],
            });
          }).fail(function () {
            AppDispatcher.handleViewAction({
              actionType: AboutConstants.FETCH,
              error: true,
            });
          });
        } else {

        }
      },
    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.FAVS,
        error: true,
      });
    });;
  },
};

module.exports = AboutActions;
