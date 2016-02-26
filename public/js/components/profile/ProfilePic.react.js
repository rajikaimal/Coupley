import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileActions from '../../actions/profile/ProfileActions';
import Dropzone from 'react-dropzone';

//tap-event-plugin
injectTapEventPlugin();

const style = {
  width: 200,
  borderRadius: 20
};

const divStyle = {
    float: 'right'
};

const previewStyle = {
    width: 196
};

const containerStyle = {
  position: 'relative'
}

const uploadButtonStyle = {
  position: 'absolute',
  marginBottom: 50
};

const ProfilePic = React.createClass({
    getInitialState: function () {
        return {
            editing: false,
            files: {},
            preview: '',
            mouseover: false,
            picture: ''
        }
    },

    componentDidMount: function() {
      ProfileActions.fetchProfilePicture(localStorage.getItem('apitoken'), localStorage.getItem('username'));
    },

    _edit: function () {
        this.setState({
            editing: true
        })
    },
    onDrop: function (files) {
        console.log(files);
        this.setState({
            files: files,
            preview: files[0].preview
        });
        


    },
    _cancelEdit: function () {
        this.setState({
            editing: false,
            preview: '',
            files: ''
        });
    },
    _saveImage: function () {
        var fd = new FormData();
        var self = this;
        fd.append('apitoken', localStorage.getItem('apitoken'));
        fd.append('file', this.state.files[0]);
        fd.append('email', localStorage.getItem('email'));
        fd.append('user', localStorage.getItem('username'));
        $.ajax({
            type: 'POST',
            url: '/api/profile/profilepic',
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("success");
                console.log(data);
                if(data.done == true) {
                  self.setState({
                    editing: false
                  });
                } else {

                }
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    },
    renderSave: function () {
        return (
            this.state.preview ? <div>
                <RaisedButton onClick={this._saveImage} label="Save" primary={true} style={style}/>
                <RaisedButton label="Cancel" onClick={this._cancelEdit} style={style} />
            </div> : ''
        );
    },
    _showUpload: function() {
      this.setState({
        mouseover: true
      });      
    },
    _hideUpload: function() {
      this.setState({
        mouseover: false
      });
    },
  render: function() {
    return (
      <div>
      	<div className="panel-body">
          <div>
            {
                this.state.editing ? <div className="col-sm-3 col-md-3 col-lg-3">
                    <Dropzone onDrop={this.onDrop}>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                        <img style={previewStyle} src={this.state.preview} />
                    </Dropzone>
                {this.renderSave()}
                </div> : <div className="col-sm-3 col-md-3 col-lg-3" >
                            <img onMouseOver={this._showUpload} style={containerStyle} onMouseLeave={this._hideUpload} src={this.state.picture} style={style} />
                            {this.state.mouseover ? <RaisedButton style={uploadButtonStyle} label="Change picture" onClick={this._cancelEdit}  /> : ''}
                          </div>

            }
              <div className="col-sm-3 col-md-3 col-lg-3">
              <h3> {this.props.firstname} {this.props.lastname} </h3>
              <span> {this.props.country} </span>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6">
                  <div style={divStyle}>
                      <IconMenu
                          iconButtonElement={<IconButton>
                              <MoreVertIcon />
                          </IconButton>}
                          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                      >
                          <MenuItem primaryText="Edit profile" onTouchTap={this._edit} />
                      </IconMenu>
                  </div>
            </div>
          </div>
        </div> 	
      </div>  
    );
  }

});

export default ProfilePic;