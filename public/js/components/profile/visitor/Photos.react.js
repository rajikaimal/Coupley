import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dropzone from 'react-dropzone';

const client_id = 'ce95bac6c6e840eea2bb5a67b072d5b2';

const buttonStyle = {
  marginTop: 75,
  marginLeft: 420,
  paddingBottom: 150
};
const previewStyle = {
    width: 196
};

const Photos = React.createClass({
  getInitialState: function() {
    return {
      preview: '',
      files: {}
    }
  },
  onDrop: function (files) {
    console.log(files);
    this.setState({
        files: files,
        preview: files[0].preview
    });

    console.log('logging state');
    console.log(this.state.files);
    var fd = new FormData();
    var self = this;
    fd.append('apitoken', localStorage.getItem('apitoken'));
    fd.append('files', this.state.files[0]);  
    
    fd.append('email', localStorage.getItem('email'));
    fd.append('user', localStorage.getItem('username'));
    console.log(fd);
    $.ajax({
        type: 'POST',
        url: '/api/profile/uploadmultiple?token=' + localStorage.getItem('apitoken'),
        data: fd,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log("success");
            console.log(data);
            if(data.done == true) {
              location.reload();
            } else {

            }
        },
        error: function (data) {
            console.log("error");
            console.log(data);
        }
    });
  },
  render: function() {
    return (
      <div>
        <div style={buttonStyle}>
          <Dropzone onDrop={this.onDrop} accept="image/*">
              <div>Try dropping some files here, or click to select files to upload.</div>
              <img style={previewStyle} src={this.state.preview} />
          </Dropzone>
        </div>
      </div>  
    );    
  }

});

export default Photos;