import React from 'react';
import ProfileActions from '../../actions/profile/ProfileActions';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

const Deactivate = React.createClass({
  getInitialState: function() {
    return {
      openDeactivate: false,
      openDelete: false
    };
  },
  componentDidMount: function () {

  },
  _deleteAccount: function() {
    ProfileActions.deleteAccount(localStorage.getItem('username'));
  },
  _deactivateAccount: function() {
    ProfileActions.deactivateAccount(localStorage.getItem('username'));
  },
  _handleDeactivate: function() {
    this.setState({
      openDeactivate: true
    });
  },
  _handleDelete: function() {
    this.setState({
      openDelete: true
    });
  },
  _handleClose: function() {
    this.setState({
      openDelete: false,
      openDeactivate: false
    })
  },
  render: function() {
    const deleteActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleClose}
      />,
      <FlatButton
        label="Got it"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._deleteAccount}
      />,
    ];
     const deactivateActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleClose}
      />,
      <FlatButton
        label="Got it"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._deactivateAccount}
      />,
    ];
    return (
      <div>
          <h3> Deactivate profile </h3>
          Deactivating your profile will make you inactive within Coupley, Other users won't be able to send messages to you over coupley.
          Feel free to come back at any time, it'll be always free. <br/>
          <FlatButton label="Deactivate account" secondary={true} onClick={this._handleDeactivate}/>
          
          <div>
          <Dialog
               title="Delete profile"
               actions={deleteActions}
               modal={false}
               open={true}
               open={this.state.openDelete}
              onRequestClose={this.handleClose} >
              You are going to delete your account
              If you proceed ...
              <ul>
                <li> You won't be able to recover any profile data again </li>
                <li> You won't be able to login with the credentials </li>
              </ul>
          </Dialog>
          </div>
          <div>
          <Dialog
               title="Deactivate profile"
               actions={deactivateActions}
               modal={false}
               open={true}
               open={this.state.openDeactivate}
              onRequestClose={this.handleClose} >
              You are going to deactivate your account
              If you proceed ...
              <ul>
                <li> You'll not be visible for other users in coupley </li>
                <li> Other users won't be able to send messages to you over coupley </li>
              </ul>
          </Dialog>
          </div> 

      </div>
    );
  }
});

export default Deactivate;
