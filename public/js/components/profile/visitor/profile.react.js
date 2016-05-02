import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import ProfilePic from './ProfilePic.react';
import { Link } from 'react-router'
import ProfileVisitorActions from '../../../actions/ProfileVisitorActions';
import VisitorStore from '../../../stores/VisitorStore';
import Countries from '../../register/countries.js';

const tabStyle = {
  marginTop: 30,
  marginLeft: 50,
  marginReft: 50
};

var str = window.location.hash;
var username = str.split(/[\/?]/)[1];

var visitorUsername;

const urlTable = {
  username: username
}

const Profile = React.createClass({
  getInitialState: function() {
    let str = window.location.hash;
    let username = str.split(/[\/?]/)[1];
    localStorage.setItem("visitor", username);
    visitorUsername = localStorage.getItem('visitor');
    return {
      firstname: VisitorStore.getUserData().firstname,
      lastname: VisitorStore.getUserData().lastname,
      country: VisitorStore.getUserData().country,
      gender: VisitorStore.getUserData().gender,
      age: VisitorStore.getUserData().age
    }

  },
  componentDidMount: function() {
    let str = window.location.hash;
    let username = str.split(/[\/?]/)[1];
    VisitorStore.addChangeListener(this._onChange);
    ProfileVisitorActions.loadProfileData(username);
    
  },
  componentWillUnmount: function() {
    ProfileVisitorActions.clearAll();
  },
  _onChange: function() {
    this.setState({
      firstname: VisitorStore.getUserData().firstname,
      lastname: VisitorStore.getUserData().lastname,
      country: VisitorStore.getUserData().country,
      gender: VisitorStore.getUserData().gender,
      age: VisitorStore.getUserData().age
    });
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
  render: function() {
    return (
      <div>
        <div className="panel panel-default">
        <ProfilePic firstname={this.state.firstname} lastname={this.state.lastname} country={this.state.country} gender={this.state.gender} age={this.state.age}/>
        <Divider />
        <div style={tabStyle}>
          <div className="btn-group btn-group-justified btn-group-info">
            <Link to={'/' + visitorUsername + '/activityfeed'} className="btn ">My Activity Feed</Link>
            <Link to={'/' + visitorUsername + '/about'} className="btn ">About</Link>
            <Link to={'/' + visitorUsername + '/photos'} className="btn ">Photos</Link>
          </div>
        </div>
        {this._renderCountry()}
        </div>
        {this.props.children}
      </div>
    );    
  }

});

export default Profile;