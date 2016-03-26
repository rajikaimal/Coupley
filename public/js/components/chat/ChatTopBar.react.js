import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Toggle from 'material-ui/lib/toggle';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ThreadStore from '../../stores/ThreadStore';
import ThreadActions from '../../actions/Thread/ThreadActions';
import LoginStore from '../../stores/LoginStore';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

const t1 = {
  marginTop:10,
};

const styles = {
  block: {
    maxWidth: 20,
  },
  toggle: {
    marginBottom: 1,
  },
};

const toggleDiv = {
  float: 'right',
  marginTop:5,
};

const likedusers = {
 user1:LoginStore.getUsername(),
};

const SelectFieldExampleSimple = React.createClass({

  handleOpen: function () {
    this.setState({ open: true });
    console.log('click una');
  },

  handleClose: function () {
    this.setState({ open: false });
  },

  handleOpen1: function () {
    this.setState({ open1: true });
    console.log('click una');
  },

  handleClose1: function () {
    this.setState({ open1: false });
  },

  handleOpen2: function () {
    this.setState({ open2: true });
    console.log('click una');
  },

  handleClose2: function () {
    this.setState({ open2: false });
  },

  getInitialState: function () {
    return {
      results:[''],
      value:4,
      open: false,
       open1: false,
       open2:false,
    };
  },

  componentDidMount: function () {
  ThreadStore.addChangeListener(this._onChange);
  ThreadActions. getlikedusers(likedusers);

},

  _onChange: function () {
  this.setState({ results:ThreadStore.getlikedusers() });
},

  LikedUsers:function () {

    ThreadActions.getlikedusers(likedusers);
  },

  handleChange:function (event, index, value) {
  localStorage.setItem('chatusername', value);
  this.setState({
    value: value,
  });
},

  togglechanged:function (e, value) {
    if (value) {
      console.log('togle unaaaa!');
    }
  },

  _blockUser: function () {
  ThreadActions.block(localStorage.getItem('chatusername'), localStorage.getItem('user'));
},

  render:function () {

    const actions = [
        <FlatButton
          label="No"
          secondary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Yes"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleClose}
        />,
      ];

      const actions1 = [
          <FlatButton
            label="No"
            secondary={true}
            onTouchTap={this.handleClose1}
          />,
          <FlatButton
            label="Yes"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleClose1}
          />,
        ];

        const actions2 = [
            <FlatButton
              label="No"
              secondary={true}
              onTouchTap={this.handleClose2}
            />,
            <FlatButton
              label="Yes"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleClose2}
            />,
          ];

  //onClick={this._blockUser}

    return (

    <div>
      <div className="pull-left" className='col-md-8'>
        <SelectField value={this.state.value} onChange={this.handleChange}>
        {
            this.state.results.map(item => {
              return (<MenuItem value = {item.username} primaryText = {item.firstname} />);
            })
        }
        </SelectField>

      </div>
        <FlatButton label="+ New Message"  style={t1}  onClick={this.handleOpen2}/>
        <IconMenu  style={toggleDiv} iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}>
       <MenuItem primaryText="Delete" onTouchTap={this.handleOpen}/>
       <MenuItem primaryText="Block" onTouchTap={this.handleOpen1} />
      </IconMenu>
      <Dialog
        title="Delete Conversation"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Are you sure you want to delete tis conversation?.
      </Dialog>
      <Dialog
        title="Block user"
        actions={actions1}
        modal={false}
        open={this.state.open1}
        onRequestClose={this.handleClose1}
      >
        Are you sure you want to block this user?.
      </Dialog>

      <Dialog
        title="New Message"
        actions={actions2}
        modal={false}
        open={this.state.open2}
        onRequestClose={this.handleClose2}
      >
        Are you sure you want to block this user?.
      </Dialog>

    </div>
    );
  },
});



export default SelectFieldExampleSimple;
