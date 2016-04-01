import React from 'react';
import Card from 'material-ui/lib/card/card';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import ActivityfeedAction from '../../actions/ActivityFeed/ActivityfeedAction';
import LoginStore from '../../stores/LoginStore';
import StatusStore from '../../stores/StatusStore';
import RaisedButton from 'material-ui/lib/raised-button';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dropzone from 'react-dropzone';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import GridList from 'material-ui/lib/grid-list/grid-list';

//tap-event-plugin
injectTapEventPlugin();

const style = {
  width: 800,
  marginLeft: 40,
  position:'relative',

};

const style1 = {
  width: 760,
  position:'relative',
};

const cardStyle = {
  width: 800,
  height: 300,
  marginLeft: 40,
  position:'relative',
};

const previewStyle = {
    width: 196
};

const buttonStyle = {
  marginTop: 22,
  width: 200
};

function validateStatusText(textStatus) {
  if(textStatus.length > 250) {
    return {
      "error": "*status is too long"
    }
  }
  else if(textStatus === "") {
    return {
      "error": "*status cannot be empty"
    }
  }
  else {
    return true;
  }
};

const StatusBox = React.createClass({
  getInitialState: function () {
    return {
      statusText: '',
      editingPic: false,
      preview: '',
      files: {},
    }
  },

    _editProfilePic: function () {
        this.setState({
            editingPic: !this.state.editingPic
        });
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
            editingPic: false,
            preview: '',
            files: '',
        });
    },

    renderSave: function () {
        return (
            this.state.preview ? <div> 
                <RaisedButton label="Cancel" onClick={this._cancelEdit} style={buttonStyle} />
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

  addStatus:function(){
    let val = true;
    var status = this.refs.statusBox.getValue();
          
    if(validateStatusText(status).error) {
      this.setState({
        statusText: validateStatusText(status).error
      });
      val = false;
    } 
    else {

        if(this.state.editingPic) {
            var fd = new FormData();
            var self = this;
            var token = Math.random();
            fd.append('file', this.state.files[0]);
            fd.append('email', localStorage.getItem('email'));
            fd.append('userId', 11);
            fd.append('firstName',LoginStore.getFirstname());
            fd.append('status',status);
            fd.append('token', token);
            $.ajax({
                type: 'POST',
                url: '/api/imageStatus',
                data: fd,
                contentType: false,
                processData: false,
                success: function (data) {
                    console.log("success");
                    console.log(data);

                      ActivityfeedAction._getStatus(11);
                      location.reload();
                    
                },
                error: function (data) {
                    console.log("error");
                    console.log(data);
                }
            });
            {this._cancelEdit}
        }
        else {
          let statusData = {
          email: LoginStore.getEmail(),
          userId: 11,
          firstName: LoginStore.getFirstname(),
          status: status,
          };
          ActivityfeedAction._addStatus(statusData);
        }

      this.setState({
        statusText: ''
      });
    }
    this.clearText();
  },

  clearText:function() {
    document.getElementById('txtStatus').value = "";
  },

  /**
   * @return {object}
   */
  render: function () {
    return (
      <div>
        <Card style={style}>
          <Paper zDepth={1}>
            <div className='col-md-10'></div>
              <TextField style={style1} className='col-md-2' fullWidth={true} hintText="What's new with you? " multiLine={true} errorText={this.state.statusText} ref="statusBox" id="txtStatus" />
              
              <div>
                {
                  this.state.editingPic ? <Card style={cardStyle}>
                                            <div className="col-sm-3 col-md-3 col-lg-3">
                                              <Dropzone onDrop={this.onDrop} multiple={false} accept="image/*">
                                              <div>Try dropping some images here, or click to select images to upload.</div>
                                                <img style={previewStyle} src={this.state.preview} />
                                              </Dropzone>
                                              {this.renderSave()}
                                            </div>
                                          </Card> : ''
                }
              </div>

              <FlatButton className='col-md-1' label="Photos" onClick={this._editProfilePic}/>
              <div className='col-md-9'></div>
              <FlatButton className='col-md-1' label="Post"  rippleColor='#2196F3' onClick={this.addStatus}/>
          </Paper>
        </Card>
      </div>
    );
  }
});

export default StatusBox;