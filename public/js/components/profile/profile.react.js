import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';

import { Link } from 'react-router'

const tabstyle = {
  marginTop: 30,
  marginLeft: 50,
  marginReft: 50
};

const style = {
  width: 200,
  borderRadius: 20
};

const Profile = React.createClass({
  render: function() {
    return (
      <div>
        <div className="panel-body">
          <div>
            <div className="col-lg-3">
              <img src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" style={style} />
            </div>
            <div className="col-lg-6">
              <h3> Tiffany Hwang </h3>
            </div>
            <div className="col-lg-6">
              <span> Country etc... </span>
            </div>
          </div>
        </div>
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