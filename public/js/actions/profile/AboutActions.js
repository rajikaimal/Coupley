var AppDispatcher = require('../../dispatcher/AppDispatcher');
var AboutConstants = require('../../constants/AboutConstants');

var AboutActions = {
  fetchAll: function() {
    $.get('/api/profile/about?token=' + localStorage.getItem('apitoken') + '&email=' + localStorage.getItem('email'), function(response) {
      console.log(response);
      if(response.status === 200) {
        AppDispatcher.handleViewAction({
          actionType: AboutConstants.FETCH,
          data: response.data[0]
        });
      }
      else {
        console.log('Somthing happened ...');
      }

    }).fail(function(error) {
      console.log('Somthing happened');
    });
  },
  updatesummary: function(summary) {
  	$.ajax({
      url: '/api/profile/edit/summary',
      type: 'PUT',
      data: "email=" + localStorage.getItem('email') + "&summary=" + summary,
      success: function(response) {
        console.log('DOne ... ' + response);
        if(response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.SUMMARY,
            summary: summary
          });
        } 
        else {
          console.log('Somthing happened');
        }
      }
    });
  },
  updatelife: function(life) {
    $.ajax({
      url: '/api/profile/edit/life',
      type: 'PUT',
      data: "email=" + localStorage.getItem('email') + "&life=" + life,
      success: function(response) {
        console.log('DOne ... ' + response);
        if(response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.LIFE,
            life: life
          });
        } 
        else {
          console.log('Somthing happened');
        }
      }
    });
  },
  updategoodat: function(goodat) {
    console.log('Goodat ' + goodat);
    $.ajax({
      url: '/api/profile/edit/goodat',
      type: 'PUT',
      data: "email=" + localStorage.getItem('email') + "&goodat=" + goodat,
      success: function(response) {
        console.log('DOne ... ' + response);
        if(response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.GOODAT,
            goodat: goodat
          });
        } 
        else {
          console.log('Somthing happened');
        }
      }
    });
  },
  updatethinkingof: function(thinkingof) {
    $.ajax({
      url: '/api/profile/edit/thinkingof',
      type: 'PUT',
      data: "email=" + localStorage.getItem('email') + "&thinkingof=" + thinkingof,
      success: function(response) {
        console.log('DOne ... ' + response);
        if(response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.THINKING,
            thinkingof: thinkingof
          });
        } 
        else {
          console.log('Somthing happened');
        }
      }
    });
  },
  updatefavs: function(favs) {
    $.ajax({
      url: '/api/profile/edit/favs',
      type: 'PUT',
      data: "email=" + localStorage.getItem('email') + "&favs=" + favs,
      success: function(response) {
        console.log('DOne ... ' + response);
        if(response.status === 200) {
          AppDispatcher.handleViewAction({
            actionType: AboutConstants.FAVS,
            favs: favs
          });
        } 
        else {
          console.log('Somthing happened');
        }
      }
    });
  }
};

module.exports = AboutActions;