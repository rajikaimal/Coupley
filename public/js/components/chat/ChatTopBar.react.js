import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Toggle from 'material-ui/lib/toggle';
import ThreadStore from '../../stores/ThreadStore';
import ThreadActions from '../../actions/Thread/ThreadActions';
import LoginStore from '../../stores/LoginStore';
import RaisedButton from 'material-ui/lib/raised-button';

const t1={
  paddingLeft:10,
  backgroundColor:'green',
}

const styles = {
  block: {
    maxWidth: 20,
  },
  toggle: {
    marginBottom: 1,
  },
};

const toggleDiv = {
    float: 'right'
};

const SelectFieldExampleSimple= React.createClass({

getInitialState: function(){
      return {
      results:[''],
      value:4
  };
},
componentDidMount: function() {
  ThreadStore.addChangeListener(this._onChange);
  let likedusers={
    user1:LoginStore.getFirstname()
  }
  console.log('ádsadsaddas');
  console.log(LoginStore.getFirstname());
  ThreadActions.getlikedusers(likedusers);

},

_onChange: function() {
  this.setState({results:ThreadStore.getlikedusers()});
},

LikedUsers:function(){

   let likedusers={
     user1:LoginStore.getFirstname()
   }
    ThreadActions.getlikedusers(likedusers);
},


handleChange:function(event, index, value){
  localStorage.setItem('chatname', value);
  this.setState({
    value: value
  })
},

togglechanged:function(e, value){

   if(value){
    console.log("togle unaaaa!");
 }

},

_blockUser: function() {
  ThreadActions.block(localStorage.getItem('chatname'), localStorage.getItem('user'));
},

  render:function() {
    return (

    <div>
      <div className="pull-left" style={t1}>
        <SelectField value={this.state.value} onChange={this.handleChange}>
        {
            this.state.results.map(item => {
              return(
                <MenuItem value={item.user2} primaryText={item.user2} />
              )
           })
        }
        </SelectField>
      </div>



      <div style={toggleDiv}>
        <RaisedButton label="Primary" primary={true} onClick={this._blockUser}/>
        <Toggle style={styles.toggle} onToggle={this.togglechanged} />
      </div>
    </div>
    );
  }
});


export default SelectFieldExampleSimple;
