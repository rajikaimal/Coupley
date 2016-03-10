import React from 'react';
import CardText from 'material-ui/lib/card/card-text';
import Card from 'material-ui/lib/card/card';
import Dialog from 'material-ui/lib/dialog';
import Snackbar from 'material-ui/lib/snackbar';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import HeaderActions from '../../actions/HeaderActions';
import ProfileStore from '../../stores/ProfileStore';

const styles = {
  button: {
    margin: 12,

  },
  errorStyle: {
    color: Colors.pink500,
  },
};

const signupStyle = {
    color: 'black',
    marginTop: '25'
}

const err = { color: 'red' };

const textStyle = {
  marginLeft: 15
};

const Feedback = React.createClass({
  getInitialState: function() {
    return {
      openDialog: false,
      openSnackBar: false,
      type: "activity"
    }
  },
  componentDidMount: function() {
    ProfileStore.getDoneStatus();
    ProfileStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      openSnackBar: ProfileStore.getDoneStatus()
    });
  },
  _showFeedback: function() {
    this.setState({
      openDialog: true
    });
    return false;
  },
  _postFeedback: function() {
    let type = this.state.type;
    let comment = this.refs.comment.getValue();
    let username = localStorage.getItem('username');
    let data = {
      type: type,
      comment: comment,
      username: username
    }
    HeaderActions.postFeedback(data);
    this.setState({
      openDialog: false
    });
  },
  _handleClose: function() {
    this.setState({
      openDialog: false
    });
  },
  _handleChange: function(e, index, value) {
    this.setState({
      type: value
    });
  },
  render: function() {
    const actions = [
        <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this._handleClose}
        />,
        <FlatButton
            label="Update"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this._postFeedback}
        />,
    ];
    return (
      <div>
        <Card style={signupStyle}>
          <CardText>
            Have something to <span onClick={this._showFeedback}> say </span> ?
          </CardText>
        </Card>
        <Dialog
              title="Feedback"
              actions={actions}
              modal={true}
              open={this.state.openDialog}
              onRequestClose={this.handleClose}
              contentStyle={{ height:1000 }}
            >
            Category
            <DropDownMenu value={this.state.type} onChange={this._handleChange}>
              <MenuItem value="activity" primaryText="Activity feed"/>
              <MenuItem value="timeline" primaryText="Timeline"/>
              <MenuItem value="chat" primaryText="Chat"/>
              <MenuItem value="privacy" primaryText="Privacy"/>
              <MenuItem value="other" primaryText="other"/>
            </DropDownMenu>
            <br/>
            Comment <TextField
                hintText="comment" style={textStyle} floatingLabelText="comment" fullwidth={true} ref="comment" />
            <br />
        </Dialog>
          <Snackbar
              open={this.state.openSnackBar}
              message="Feeback was posted succesfully !"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
      </div>
    );
  }
});

export default Feedback;