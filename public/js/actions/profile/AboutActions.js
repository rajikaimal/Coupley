var AppDispatcher = require('../../dispatcher/AppDispatcher');
var AboutConstants = require('../../constants/AboutConstants');

var AboutActions = {
  fetchAll: function () {
    $.get('/api/profile/about?token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email'), function (response) {
      console.log(response);
      if (response.status === 200) {
        AppDispatcher.handleViewAction({
          actionType: AboutConstants.FETCH,
          data: response.data[0],
        });
      } else {
        console.log('Somthing happened ...');
      }

    }).fail(function () {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.FETCH,
        error: true,
      });
    });
  },

  updatesummary: function (summary) {
    $.ajax({
      url: '/api/profile/edit/summary',
      type: 'PUT',
      data: 'email=' + localStorage.getItem('email') + '&summary=' + summary,
      success: function (response) {
        console.log('DOne ... ' + response);
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.SUMMARY,
            summary: summary,
          });
        } else {
          console.log('Somthing happened');
        }
      },
    }).fail(function() {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.SUMMARY,
        error: true,
      });
    });
  },

  updatelife: function (life) {
    $.ajax({
      url: '/api/profile/edit/life',
      type: 'PUT',
      data: 'email=' + localStorage.getItem('email') + '&life=' + life,
      success: function (response) {
        console.log('DOne ... ' + response);
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.LIFE,
            life: life,
          });
        } else {
          console.log('Somthing happened');
        }
      },
    }).fail(function() {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.LIFE,
        error: true,
      });
    });;
  },

  updategoodat: function (goodat) {
    console.log('Goodat ' + goodat);
    $.ajax({
      url: '/api/profile/edit/goodat',
      type: 'PUT',
      data: 'email=' + localStorage.getItem('email') + '&goodat=' + goodat,
      success: function (response) {
        console.log('DOne ... ' + response);
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.GOODAT,
            goodat: goodat,
          });
        } else {
          console.log('Somthing happened');
        }
      },
    }).fail(function() {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.GOODAT,
        error: true,
      });
    });;
  },

  updatethinkingof: function (thinkingof) {
    $.ajax({
      url: '/api/profile/edit/thinkingof',
      type: 'PUT',
      data: 'email=' + localStorage.getItem('email') + '&thinkingof=' + thinkingof,
      success: function (response) {
        console.log('DOne ... ' + response);
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.THINKING,
            thinkingof: thinkingof,
          });
        } else {
          console.log('Somthing happened');
        }
      },
    }).fail(function() {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.THINKING,
        error: true,
      });
    });;
  },

  updatefavs: function (favs) {
    $.ajax({
      url: '/api/profile/edit/favs',
      type: 'PUT',
      data: 'email=' + localStorage.getItem('email') + '&favs=' + favs,
      success: function (response) {
        console.log('DOne ... ' + response);
        if (response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.FAVS,
            favs: favs,
          });
        } else {
          console.log('Somthing happened');
        }
      },
    }).fail(function() {
      AppDispatcher.handleViewAction({
        actionType: AboutConstants.FAVS,
        error: true,
      });
    });;
  },

  updateLookingFor: function(data) {
    console.log("sending req");
    $.ajax({
      url: '/api/profile/lookingfor?token=' + localStorage.getItem('apitoken'),
      type: 'PUT',
      data: 'username=' + localStorage.getItem('username') + '&location=' + data.location + '&minage=' + data.minage + '&maxage=' + data.maxage + '&relstatus=' + data.relstatus + '&shortterm=' + data.shortterm + '&longterm=' + data.longterm + '&casualsex=' + data.casualsex,
      success: function (response) {
        console.log(response);
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
};

module.exports = AboutActions;
