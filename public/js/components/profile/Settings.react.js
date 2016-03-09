import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import { Link } from 'react-router';
import ProfileActions from '../../actions/profile/ProfileActions';
import ProfileStore from '../../stores/ProfileStore';
import Colors from 'material-ui/lib/styles/colors';

const Profile = React.createClass({
  getInitialState: function() {
    return ProfileStore.getUserData();
  },
  componentDidMount: function() {
    
  },
  _onChange: function() {
    
  },
  _navAccount: function() {
    document.location = "/#/isettings/account";
  },
  _navBlocked: function() {
    document.location = "/#/isettings/blocked";
  },
  _navDeactiviate: function() {
    document.location = "/#/isettings/deactivate";
  },
  render: function() {
    return (
      <div>
        <div className="col-lg-3">
          <div className="panel panel-default">
            <div className="panel-body">
                <ListItem
                    primaryText="Account" onClick={this._navAccount}/>
                  <Divider />
                <ListItem
                    primaryText="Blocked" onClick={this._navBlocked}/>
                  <Divider />
                <ListItem
                    primaryText="Deactivate" onClick={this._navDeactiviate}/>
                  <Divider />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
        {this.props.children}
        </div>
      </div>
    );    
  }

});

export default Profile;