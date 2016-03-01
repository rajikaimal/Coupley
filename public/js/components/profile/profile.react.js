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
      return ProfileStore.getuserdata();
  },
  componentDidMount: function() {
    ProfileActions.getProfileData();
    ProfileStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(ProfileStore.getuserdata());
  },
  render: function() {
    return (
      <div>
        <div className="panel panel-default">
          <ProfilePic firstname={this.state.firstname} lastname={this.state.lastname} username={this.state.username} country={this.state.country}/>

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
      </div>
    );    
  }

});

export default Profile;