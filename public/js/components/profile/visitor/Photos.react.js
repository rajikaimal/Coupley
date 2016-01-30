import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const buttonStyle = {
  marginTop: 75,
  marginLeft: 420,
  paddingBottom: 150
};

const Photos = React.createClass({
  render: function() {
    return (
      <div>
        <div style={buttonStyle}>
          <RaisedButton label="Link to Instagram" primary={true} />
        </div>
      </div>  
    );    
  }

});

export default Photos;