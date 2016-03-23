import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const client_id = 'ce95bac6c6e840eea2bb5a67b072d5b2';

const buttonStyle = {
  marginTop: 75,
  marginLeft: 420,
  paddingBottom: 150
};

const Photos = React.createClass({
  _requestInstagram: function() {
    console.log('requesting');
    $.get('https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=http://localhost:3000&response_type=token');
  },
  render: function() {
    return (
      <div>
        <div style={buttonStyle}>
          <RaisedButton label="Link to Instagram" primary={true} onClick={this._requestInstagram}/>
        </div>
      </div>  
    );    
  }

});

export default Photos;