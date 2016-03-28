import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import ProfilePic from './ProfilePic.react';
import { Link } from 'react-router';
import ProfileActions from '../../actions/profile/ProfileActions';
import ProfileStore from '../../stores/ProfileStore';
import Colors from 'material-ui/lib/styles/colors';
import Countries from '../register/countries.js';

const tabstyle = {
  marginTop: 30,
  marginLeft: 50,
  marginReft: 50
};

const sectionStyle = {
  color: Colors.deepPurple500,
  fontWeight: 'bold'
};

const Profile = React.createClass({
  getInitialState: function() {
    return ProfileStore.getUserData();
  },
  componentDidMount: function() {
    ProfileActions.getProfileData();
    ProfileStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(ProfileStore.getUserData());
  },
  _renderCountry: function() {
    var found = false;
    for(var i = 0; i < Countries.length; i++) {
        if (Countries[i].code == this.state.country) {
            found = true;
            this.setState({
              country: Countries[i].name
            })
            break;
        }
    }
  },
  _renderAge: function() {
    //let today = new Date().getFullYear();
    //alert(this.state.age);
    var str = "2010-1-10";
    
  },
  render: function() {
    return (
      <div>
        <div className="panel panel-default">
          <ProfilePic firstname={this.state.firstname} lastname={this.state.lastname} username={this.state.username} age={this.state.age} country={this.state.country}/>

            <Divider />
          <div style={tabstyle}>
            <div className="btn-group btn-group-justified btn-group-info">
              <Link to={`/profile/activityfeed`} className="btn " style={sectionStyle}>My Activity Feed</Link>
              <Link to={`/profile/about`} className="btn " style={sectionStyle}>About</Link>
              <Link to={`/profile/photos`} className="btn " style={sectionStyle}>Photos</Link>
            </div>
          </div>
        </div>
        {this.props.children}
        {this._renderCountry()}
        {this._renderAge()}
      </div>
    );    
  }

});

export default Profile;