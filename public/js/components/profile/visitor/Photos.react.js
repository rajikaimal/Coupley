import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ProfileActions from '../../../actions/profile/ProfileActions';
import ProfileStore from '../../../stores/ProfileStore';

const Photos = React.createClass({
  getInitialState: function() {
    return {
      photos: []
    }
  },
  componentDidMount: function() {
    ProfileActions.fetchPhotos();
    ProfileStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      photos: ProfileStore.getPhotos()
    });
  },

  _renderPhotos: function() {
    return this.state.photos.map(function(path) {
      return (
        <img src={path} />
      );
    });
  },

  render: function() {
    return (
      <div>
        <div>
          {
            this.state.photos ? this._renderPhotos() : ''
          }
        </div>
      </div>  
    );    
  }

});

export default Photos;