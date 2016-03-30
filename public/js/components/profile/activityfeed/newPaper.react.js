import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';

import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import ActivityFeedActions from '../../../actions/ActivityFeed/ActivityFeedActions';
import LoginStore from '../../../stores/LoginStore';

const PaperExampleSimple = React.createClass({

    EnterKey(e) {
        if (e.key === 'Enter') {
            if(this.refs.statusBox.getValue()) {
                var status = this.refs.statusBox.getValue();
                var email = LoginStore.getEmail();
                var firstname = LoginStore.getFirstname();
                let addStatus = {
                    Status: status,
                    Email: email,
                    Fname: firstname
                };
                ActivityFeedActions.addStatusProfile(addStatus);
                ActivityFeedActions.loadPosts(localStorage.getItem('username'));
                this.refs.statusBox.value = '';
            } else {
                this.setState({
                    error: 'empty !'
                });
            }
        }
    },
    
    getInitialState: function() {
        return {
            error: ''
        }
    },

    render: function () {
        return (
            <div className="col-lg-6">
                <Paper zDepth={1}>
                    <TextField multiLine={true}
                          rows={2}
                          rowsMax={8}
                          hintText="What's new with you? " 
                          fullWidth={true} 
                          errorText={this.state.error}
                          onKeyPress={this.EnterKey} ref="statusBox" />
                </Paper>
                <br/><br/>
            </div>
        );
    }
});

export default PaperExampleSimple;
