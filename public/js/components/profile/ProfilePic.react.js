import React from 'react';

const style = {
  width: 200,
  borderRadius: 20
};

const ProfilePic = React.createClass({
  render: function() {
    return (
      <div>
      	<div className="panel-body">
          <div>
            <div className="col-lg-3">
              <img src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" style={style} />
            </div>
            <div className="col-lg-6">
              <h3> {this.props.firstname} {this.props.lastname} </h3>
            </div>
            <div className="col-lg-6">
              <span> {this.props.country} </span>
            </div>
          </div>
        </div> 	
      </div>  
    );
  }

});

export default ProfilePic;