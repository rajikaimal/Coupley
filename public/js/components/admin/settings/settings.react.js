import React from 'react';
import Snack from './snackbar.react';
import NewAdminModal from './NewAdminmodal.react';
import UpAdminModal from './updateAdminmodal.react';
import PwdModal from './ResetPwd.react';
import DeactivateModal from './Deactivate.react';
import Divider from 'material-ui/lib/divider';
const div = {
  float:'left',

};
var AdminSettings = React.createClass({
  render: function () {
    return (
        <div>
          <div style={div}>
            <UpAdminModal/> <NewAdminModal/> <PwdModal/> <DeactivateModal/>
          </div>
        </div>
    );
  },
});
export default AdminSettings;
