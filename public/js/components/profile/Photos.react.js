import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import ProfileActions from '../../actions/profile/ProfileActions';
import ProfileStore from '../../stores/ProfileStore';
import Photo from './Photo.react';

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
    console.log('changeddd');
    this.setState({
      photos: ProfileStore.getPhotos()
    });
    console.log(this.state.photos);
  },

  _renderPhotos: function() {
    console.log('rendering');
    return this.state.photos.map(function(path) {
      return (
        <Photo path={path} />
      );
    });
  },

  render: function() {
    return (
      <div className="col-lg-6">
        <h3>Your Photos</h3>
        <div >
          {
            this.state.photos ? this._renderPhotos() : ''
          }
        </div>
      </div>  
    );    
  }

});

export default Photos;