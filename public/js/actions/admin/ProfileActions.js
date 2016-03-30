var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ProfileConstants = require('../../constants/ProfileConstants');
var SearchConstants = require('../../constants/SearchConstants');

var ProfileActions = {
  getAdminProfileData: function (email) {

    $.get('/admin-api/adminprofile?email=' + localStorage.getItem('emails'), function (response) {

      if (response) {
        AppDispatcher.handleViewAction({
          actionType: ProfileConstants.GETDATA,
          userdata: response.admin[0],
        });
      } else if (response.status === 300) {
        swal('Something Went Wrong', 'Please try again in a moment', 'error');
      }
    });
  },

  getsearchresults: function (searchkey) {
    if (searchkey == '') {
      console.log('Null searchkey');
    } else {
      $.get('admin-api/searches' + '?key=' + searchkey, function (response) {
        if (response.status == 201 && response.users) {
          AppDispatcher.handleViewAction({
            actionType: SearchConstants.SEARCH,
            search: response.users,
          });
        } else if (response.status == 200) {
          AppDispatcher.handleViewAction({
            actionType: SearchConstants.SEARCH,
            search: '',
          });
        }
      }).fail(function () {
        AppDispatcher.handleViewAction({
          actionType: SearchConstants.SEARCH,
          search: 'err',
        });
      });
    }

  },
};

module.exports = ProfileActions;
