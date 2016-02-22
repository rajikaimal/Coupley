import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import injectTapEventPlugin from 'react-tap-event-plugin';

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

const ProfilePic = React.createClass({
    getInitialState: function () {
        return {
            editing: false,
            files: {},
            preview: ''
        }
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
        var data = this.state.files[0];
        $.ajax({
            type: 'POST',
            url: '/api/profile/profilepic',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("success");
                console.log(data);
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
                </div> : <div className="col-sm-3 col-md-3 col-lg-3">
              <img src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" style={style} />
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