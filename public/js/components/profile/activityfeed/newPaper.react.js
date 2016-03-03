import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';

import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import ActivityfeedAction from '../../../actions/ActivityFeed/ActivityfeedAction';
import LoginStore from '../../../stores/LoginStore';

const style = {
    top: 50,
    marignBottom: 150
};

const PaperExampleSimple = React.createClass({

    EnterKey(e) {
        if (e.key === 'Enter') {
            console.log();
            console.log(this.refs.statusBox.getValue());
            var status = this.refs.statusBox.getValue();
            var email = LoginStore.getEmail();
            var firstname = LoginStore.getFirstname();
            let add_status = {
                Status: status,
                Email: email,
                Fname: firstname
            };
            ActivityfeedAction.addStatusProfile(add_status);

        }
    },

    render: function () {
        return (
            <div style={style}>
                <Paper zDepth={1}>
                    <TextField hintText="What's new with you? " multiLine={false} fullWidth={true} onKeyPress={this.EnterKey} ref="statusBox" />
                </Paper>
                <br/><br/>
            </div>
        );
    }
});

export default PaperExampleSimple;
