import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

const BlockDialog = React.createClass({
  render: function() {
  	 const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Got it"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
      	<Dialog
             title="Block user"
             actions={actions}
             modal={false}
             open={this.state.open}
             onRequestClose={this.handleClose}>
            <TextField hintText="Update your status" multiLine={false} fullWidth={true} ref="EditBox" defaultValue={this.props.post_text}/>
        </Dialog>
      </div> 
    );  
  }
});

export default BlockDialog;