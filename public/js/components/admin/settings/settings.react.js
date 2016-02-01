import React from 'react';
import Snack from './snackbar.react';
import NewAdminModal from './NewAdminmodal.react';
import UpAdminModal from './updateAdminmodal.react';
const div = {
    "position": "relative",
    "min-height": "1px",
    "padding-right": "1px",
    "padding-left": "1px"
};
var AdminSettings = React.createClass({
    render: function () {
        return (
            <div>
                <div>

                    <UpAdminModal/>

                </div>
                <div style={div}>
                    <NewAdminModal/>
                </div>
            </div>
        );
    }
});
export default AdminSettings;