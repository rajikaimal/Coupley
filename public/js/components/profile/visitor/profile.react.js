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

const tabstyle = {
  marginTop: 30,
  marginLeft: 50,
  marginReft: 50
};


const Profile = React.createClass({
  getInitialState: function() {
    return {
      firstname: VisitorStore.getuserdata().firstname,
      lastname: VisitorStore.getuserdata().lastname,
      country: VisitorStore.getuserdata().country
    }
  },
  componentDidMount: function() {
    var username = "tiffany";
    VisitorStore.addChangeListener(this._onChange);
    ProfileVisitorActions.loadprofiledata(username);
  },
  componentWillUnmount: function() {

  },
  _onChange: function() {
    this.setState({
      firstname: VisitorStore.getuserdata().firstname,
      lastname: VisitorStore.getuserdata().lastname,
      country: VisitorStore.getuserdata().country  
    });
  },
  render: function() {
    return (
      <div>
        <ProfilePic firstname={this.state.firstname} lastname={this.state.lastname} country={this.state.country}/>
        <Divider />
        <div style={tabstyle}>
          <div className="btn-group btn-group-justified btn-group-info">
            <Link to={`/profile/activityfeed`} className="btn ">My Activity Feed</Link>
            <Link to={`/profile/about`} className="btn ">About</Link>
            <Link to={`/profile/photos`} className="btn ">Photos</Link>
          </div>
        </div>
        {this.props.children}
      </div>
    );    
  }

});

export default Profile;