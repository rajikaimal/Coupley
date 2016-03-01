import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ThreadStore from '../../stores/ThreadStore';
import ThreadActions from '../../actions/Thread/ThreadActions';
import LoginStore from '../../stores/LoginStore';


const t1={
  paddingLeft:10,
  backgroundColor:'green',
}

const SelectFieldExampleSimple= React.createClass({

getInitialState: function(){
      return {
      results:ThreadStore.getlikedusers(),
      value:4
  };
},
componentDidMount: function() {
  ThreadStore.addChangeListener(this._onChange);
  let likedusers={
    user1:LoginStore.getFirstname()
  }
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

   this.setState({value});

},

  render:function() {
    return (
      <div className="pull-left" style={t1}>
        <SelectField value={this.state.value} onChange={this.handleChange}>
         <MenuItem value={1} primaryText="Tiffany"/>
         <MenuItem value={2} primaryText="Alo"/>
         <MenuItem value={3} primaryText="Chris"/>
         <MenuItem value={4} primaryText="Select name"/>
        </SelectField>
      </div>
    );
  }
});


export default SelectFieldExampleSimple;
