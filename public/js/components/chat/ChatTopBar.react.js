import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';




const SelectFieldExampleSimple= React.createClass({

getInitialState: function(){
      return {
       value:2
  };
},



handleChange:function(event, index, value){

   this.setState({value});

},


  render:function() {
    return (
      <div>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Never"/>
          <MenuItem value={2} primaryText="Every Night"/>
          <MenuItem value={3} primaryText="Weeknights"/>
          <MenuItem value={4} primaryText="Weekends"/>
          <MenuItem value={5} primaryText="Weekly"/>
        </SelectField>
      </div>
    );
  }
});


export default SelectFieldExampleSimple;
