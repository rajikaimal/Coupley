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

const urlTable = {
  username: username
}

const Profile = React.createClass({
  getInitialState: function() {
    let str = window.location.hash;
    let username = str.split(/[\/?]/)[1];
    return {
      firstname: VisitorStore.getUserData().firstname,
      lastname: VisitorStore.getUserData().lastname,
      country: VisitorStore.getUserData().country
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
      country: VisitorStore.getUserData().country  
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
        <ProfilePic firstname={this.state.firstname} lastname={this.state.lastname} country={this.state.country}/>
        <Divider />
        <div style={tabStyle}>
          <div className="btn-group btn-group-justified btn-group-info">
            <Link to={'/' + urlTable['username'] + '/activityfeed'} className="btn ">My Activity Feed</Link>
            <Link to={'/' + urlTable['username'] + '/about'} className="btn ">About</Link>
            <Link to={'/' + urlTable['username'] + '/photos'} className="btn ">Photos</Link>
          </div>
        </div>
        {this.props.children}
        {this._renderCountry()}
        </div>
      </div>
    );    
  }

});

export default Profile;