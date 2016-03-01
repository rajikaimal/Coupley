import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Slider from 'material-ui/lib/slider';

const radioStyle = {
  marginLeft: '15'
}

var Answers = [];

const Question = React.createClass({
  getInitialState: function() {
    return {
      answer1: null,
      answer2: null,
    }
  },
  _value: function(event,val) {
    console.log(val);
    console.log(this.props.id);
    if(this.props.id == 1) {
      this.setState({
        answer1: {
          "id": this.props.id,
          "value": val
        } 
      });
    }
    else if(this.props.id == 2) {
      this.setState({
        answer2: {
          "id": this.props.id,
          "value": val
        } 
      });  
    }
    
    if(this.state.answer1 != null && this.state.answer2 !=null && this.state.answer3 !=null && this.state.answer4 !=null && this.state.answer5 !=null) {
      console.log('Done !');
    }
  },
  render: function() {
    return (
      <div>
       <ListItem primaryText={this.props.question} disabled={true}/>
       <RadioButtonGroup name="shipSpeed" onChange={this._value} style={radioStyle}>
          <RadioButton
            value="yes"
            label="Yes"/>
          <RadioButton
            value="no"
            label="Nope"/>
        </RadioButtonGroup>
        Importance ...
        <Slider defaultValue={0} />
       <Divider />
      </div>
    );    
  }

});

export default Question;