import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import UsernameIcon from 'material-ui/lib/svg-icons/action/account-circle';
import Gender from 'material-ui/lib/svg-icons/action/account-box';
import Age from 'material-ui/lib/svg-icons/action/alarm';
import Country from 'material-ui/lib/svg-icons/action/room';
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
import Colors from 'material-ui/lib/styles/colors';


function validatefirstname(firstname) {
  if(firstname.length >= 30) {
    return {
      "error": "*firstname is too long"
    }
  }
  else if(firstname === "") {
    return {
      "error": "*firstname cannot be empty"
    }
  }
  else if(! /^\w+$/i.test(firstname)) {
    return {
      "error": "*invalid firstname"
    }  
  }
  else if(firstname.match(/\d+/g)) {
    return {
      "error": "*cannot contain numbers"
    }  
  }
  else {
    return true;
  }
}

function validatelastname(lastname) {
  if (lastname.length >= 30) {
    return {
      "error": "*lastname is too long"
    }
  }
  else if(lastname === "") {
    return {
      "error": "*lastname cannot be empty"
    }
  }
  else if(! /^\w+$/i.test(lastname)) {
    return {
      "error": "*invalid lastname"
    }  
  }
  else if(lastname.match(/\d+/g)) {
    return {
      "error": "*cannot contain numbers"
    }  
  }
  else {
    return true;
  }
}

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

const error = {
    color: Colors.red500,
    fontSize: 15
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
            country: 0,
            firstnameerr: '',
            lastnameerr: '',
            countryerr: '',
        }
    },

    componentDidMount: function() {
      ProfileActions.fetchProfilePicture(localStorage.getItem('apitoken'), localStorage.getItem('username'));
      ProfileStore.addChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState({
        picture: ProfileStore.getProfilePic()
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
        for(var i = 0; i < Countries.length; i++) {
            if (this.props.country == Countries[i].name) {
                this.setState({
                  country: Countries[i].code
                })
                break;
            }
        }
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
    _saveImage: function () {
        var fd = new FormData();
        var self = this;
        fd.append('apitoken', localStorage.getItem('apitoken'));
        fd.append('file', this.state.files[0]);
        fd.append('email', localStorage.getItem('email'));
        fd.append('user', localStorage.getItem('username'));
        $.ajax({
            type: 'POST',
            url: '/api/profile/profilepic?token=' + localStorage.getItem('apitoken'),
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("success");
                console.log(data);
                if(data.done == true) {
                  ProfileActions.fetchProfilePicture(localStorage.getItem('apitoken'), localStorage.getItem('username'));
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
      let val = true;
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

      if(validatefirstname(firstname).error) {
        this.setState({
          firstnameerr: validatefirstname(firstname).error
        });
        val = false;
      }
      if(validatelastname(lastname).error) {
        this.setState({
          lastnameerr: validatelastname(lastname).error
        });
        val = false;
      }
      if(this.state.country == 0) {
        document.getElementById('country-err').innerHTML = "*invalid selection";
        val = false;  
      }

      if(val) {
        ProfileActions.updateChanges(data);  
        location.reload();
      }
    },

    handleChangeCountry: function(e, index, value) {
      this.setState({country: value});
    },

    _cancelEditProfile: function() {
      this.setState({
        editingProfile: false,
        firstnameerr: '',
        lastnameerr: ''
      });
    },

    _settings: function() {
      document.location = "/#/isettings/account";
    },
  render: function() {
    return (
      <div>
      	<div className="panel-body">
          <div>
            {
                this.state.editingPic ? <div className="col-sm-3 col-md-3 col-lg-3">
                    <Dropzone onDrop={this.onDrop} multiple={false} accept="image/*">
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
              <h3> {this.state.editingProfile ? <div><TextField
                    ref="firstname" hintText="firstname" defaultValue={this.props.firstname} 
                    errorText={this.state.firstnameerr} />
              </div> : this.props.firstname} 

                    { ' ' }

                     {this.state.editingProfile ? <div><TextField
                      ref="lastname" hintText="lastname" defaultValue={this.props.lastname} 
                      errorText={this.state.lastnameerr} />
              </div> : this.props.lastname} </h3>

              <span> <b>{ this.state.editingProfile ? ''
                       : '@' + this.props.username} </b> </span> <br/>

              <span> <b> { this.state.editingProfile ? '' : <span><IconButton  tooltip="age" tooltipPosition="bottom-right">
                            <Age viewBox="0 0 20 30" />
                </IconButton> {this.props.age} </span> } </b> </span>
              <br />

              <span> {this.state.editingProfile ? 
                    <div>
                      <DropDownMenu value={this.state.country} onChange={this.handleChangeCountry}>
          
                        {
                          Countries.map((cntry) => {
                            return (<MenuItem value={cntry.code} primaryText={cntry.name}/>);    
                          })
                        }
                        
                       </DropDownMenu>

                       <span id="country-err" style={error}> </span>
                    </div>
                     : <span><IconButton  tooltip="country" tooltipPosition="bottom-right">
                            <Country viewBox="0 0 20 30" />
                </IconButton> {this.props.country} </span>} </span>
                     {
                      this.state.editingProfile ? 
                        <div>
                          <RaisedButton onClick={this._saveChanges} label="Save changes" primary={true} style={buttonStyle}/>
                          <RaisedButton label="Cancel" onClick={this._cancelEditProfile} style={buttonStyle}/>
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
                          <MenuItem primaryText="Settings" onTouchTap={this._settings} />
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