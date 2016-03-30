import React from 'react';
import Snack from './snackbar.react';
import NewAdminModal from './NewAdminmodal.react';
import UpAdminModal from './updateAdminmodal.react';
import PwdModal from './ResetPwd.react';
import DeactivateModal from './Deactivate.react';
import Divider from 'material-ui/lib/divider';
import PathStore from './../../../stores/admin/PathStore';
const div = {
  float:'left',

};
var AdminSettings = React.createClass({
  getInitialState: function () {
    return PathStore.getpath();
  },

  componentDidMount: function () {
    PathStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(PathStore.getpath());
  },

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
