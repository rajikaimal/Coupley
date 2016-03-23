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
  getInitialState: function () {
    return {
      results:[''],
      value:4,
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
        <FlatButton label="+ New Message"  style={t1} />
        <IconMenu  style={toggleDiv} iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} 
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}>
       <MenuItem primaryText="Delete" />
       <MenuItem primaryText="Block" onClick={this._blockUser}/>
      </IconMenu>

    </div>
    );
  },
});

 

export default SelectFieldExampleSimple;
