var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProfileConstants = require('../constants/ProfileConstants');
var VisitConstants = require('../constants/VisitConstants');

var VisitsAction = {

  getMyvisits:function (request) {
		$.get('/api/myvisits?myusername='+request.myusername, function (response) {
			if (response.status == 200) {
				AppDispatcher.handleViewAction({
						actionType:VisitConstants.MYVISITS,
						myVisitlist: response.myVlist,
					});
			}else if (response.status == 505) {
				console.log('Error 505');
			}
		});
	},

  SearchMyvisits:function (request) {
		$.get('/api/smyvisits?username='+request.username+'&myusername='+request.myusername, function (response) {
			if (response.status == 200) {
				AppDispatcher.handleViewAction({
						actionType:VisitConstants.SEARCHMYVISITS,
						myVisitSearchlist: response.smyVlist,
					});
			}else if (response.status == 505) {
				console.log('Error 505');
			}
		});
	},

  othersVisits:function (request) {
    $.get('/api/othervisits?myusername='+request.myusername, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType:VisitConstants.OTHERSVISITSS,
            othersVisitlist: response.oVlist,
          });
      }else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  searchOthersVisits:function (request) {
    $.get('/api/sothervisits?username='+request.username+'&myusername='+request.myusername, function (response) {
      if (response.status == 200) {
        AppDispatcher.handleViewAction({
            actionType:VisitConstants.SEARCHOTHERSVISITSS,
            othersVisitSearchlist: response.soVlist,
          });
      }else if (response.status == 505) {
        console.log('Error 505');
      }
    });
  },

  unfollowUser: function (visitor, username) {
    let data = {
     visitorusername: visitor,
     username: username,
   };
   console.log('menna send una data'+data);
   console.log(data);
    $.post('api/unfollowvisitor', data, function (response) {
      if (response.status == 200) {
        $.get('/api/myvisits?myusername='+response.username, function (response) {
          if (response.status == 200) {
            AppDispatcher.handleViewAction({
                actionType:VisitConstants.MYVISITS,
                myVisitlist: response.myVlist,
              });
          }else if (response.status == 505) {
            console.log('Error 505');
          }
        });
      }
    });
  },




};


module.exports = VisitsAction;
