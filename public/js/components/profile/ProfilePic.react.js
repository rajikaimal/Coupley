import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import UsernameIcon from 'material-ui/lib/svg-icons/action/account-circle';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileActions from '../../actions/profile/ProfileActions';
import ProfileStore from '../../stores/ProfileStore';
import Dropzone from 'react-dropzone';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import GridList from 'material-ui/lib/grid-list/grid-list';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Countries from '../register/countries.js';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

//tap-event-plugin
injectTapEventPlugin();

const style = {
  borderRadius: 20,
  maxHeight: '100%',
  maxWidth: '100%',
  minHeight: '100%',
  minWidth: '100%'
};

const divStyle = {
    float: 'right'
};

const previewStyle = {
    width: 196
};

const buttonStyle = {
  width: 200
};

const styles = {
  root: {

  },
  gridList: {
    width: 425,
    height: 250,
  },
};

const ProfilePic = React.createClass({
    getInitialState: function () {
        return {
            editingPic: false,
            editingProfile: false,
            files: {},
            preview: '',
            mouseover: false,
            picture: '',
            country: 0
        }
    },

    componentDidMount: function() {
      ProfileActions.fetchProfilePicture(localStorage.getItem('apitoken'), localStorage.getItem('username'));
      ProfileStore.addChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState({
        picture: ProfileStore.getprofilepic()
      });
    },

    _editProfilePic: function () {
        this.setState({
            editingPic: !this.state.editingPic
        });
    },
    _editProfile: function() {
        this.setState({
            editingProfile: !this.state.editingProfile
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
                  ProfileActions.fetchProfilePicture(localStorage.getItem('apitoken'), localStorage.getItem('username'));
                  // self.setState({
                  //   editing: false
                  // });
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
    renderSave: function () {
        return (
            this.state.preview ? <div>
                <RaisedButton onClick={this._saveImage} label="Save" primary={true} style={buttonStyle}/>
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
    _saveChanges: function() {
      let firstname = this.refs.firstname.getValue();
      let lastname = this.refs.lastname.getValue();
      let currentusername = localStorage.getItem('username');
      let country;

      let data = {
        firstname: firstname,
        lastname: lastname,
        country: this.state.country,
        username: currentusername
      }

      ProfileActions.updatechanges(data);
      // this.setState({
      //   editingProfile: false
      // });

      this.forceUpdate();
    },

    handleChangeCountry: function(e, index, value) {
      this.setState({country: value});
    },

  render: function() {
    return (
      <div>
      	<div className="panel-body">
          <div>
            {
                this.state.editingPic ? <div className="col-sm-3 col-md-3 col-lg-3">
                    <Dropzone onDrop={this.onDrop}>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                        <img style={previewStyle} src={this.state.preview} />
                    </Dropzone>
                {this.renderSave()}
                </div> : <div className="col-sm-3 col-md-3 col-lg-3">
                            
                              <GridList
                                cellHeight={200}
                                style={styles.gridList}
                              >
                                <GridTile>
                                  <img src={this.state.picture} />
                                </GridTile>
                              </GridList>
                            
                          </div>
            }
            
              <div className="col-sm-3 col-md-3 col-lg-3">
              <h3> {this.state.editingProfile ? <TextField
                    ref="firstname" hintText="firstname" defaultValue={this.props.firstname} />
                     : this.props.firstname} 

                    { ' ' }

                     {this.state.editingProfile ? <TextField
                      ref="lastname" hintText="lastname" defaultValue={this.props.lastname} />
                     : this.props.lastname} </h3>
              <span> { this.state.editingProfile ? ''
                       : '@' + this.props.username} </span> <br/>
              <span> {this.state.editingProfile ? 

                    <DropDownMenu value={this.state.country} onChange={this.handleChangeCountry}>
                        <MenuItem value={0} primaryText="Select value"/>
                      {
                        Countries.map((cntry) => {
                          return (<MenuItem value={cntry.code} primaryText={cntry.name}/>);    
                        })
                      }
                      
                     </DropDownMenu>



                     : this.props.country} </span>
                     {
                      this.state.editingProfile ? 
                        <div>
                          <FlatButton onClick={this._saveChanges} label="Save changes" primary={true} />
                          <FlatButton label="Cancel" onClick={this._editProfile}/> 
                        </div>
                        : ''
                     }
                     
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
                          <MenuItem primaryText="Change profile picture" onTouchTap={this._editProfilePic} />
                          <MenuItem primaryText="Edit profile" onTouchTap={this._editProfile} />
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