/**
 * Created by Isuru 1 on 30/01/2016.
 */
import React from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import RaisedButton from 'material-ui/lib/raised-button';

var SnackbarExampleSimple = React.createClass({
  getInitialState: function () {
    return {
      open: false,
    };
  },

  handleTouchTap: function () {
    this.setState({
      open: true,
    });

  },

  handleRequestClose: function () {
    this.setState({
      open: false,
    });

  },

  render: function () {
    return (
        <div>
          <RaisedButton
              onTouchTap={this.handleTouchTap}
              label="Add to my calendar"
            />
          <Snackbar
              open={this.state.open}
              message="Event added to your calendar"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
        </div>
    );
  },
});

export default SnackbarExampleSimple;
