import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';

const Question = React.createClass({
  render: function() {
    return (
      <div>
       <ListItem primaryText={this.props.question} leftCheckbox={<Checkbox />} />
       <Divider />
      </div>
    );    
  }

});

export default Question;