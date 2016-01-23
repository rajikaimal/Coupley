import React from 'react';
import { Link } from 'react-router'

import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';

import MockChat from '../profile/MockChat.react';

const Header = React.createClass({
	_search: function() {
		document.location = "/#/search";
	},
	render: function() {
	    return (
	    	<div>
			  <div className="navbar navbar-inverse">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				      </button>
				      <a className="navbar-brand" href="/#/">Coupley</a>
				    </div>
				    <div className="navbar-collapse collapse navbar-inverse-collapse">
				      <ul className="nav navbar-nav">
				        
				        <li></li>
				        <li><Link to={`/likes`}>Likes</Link></li>
				      </ul>
				      <form className="navbar-form navbar-left">
				        <div className="form-group">
				          <input type="text" className="form-control col-md-8" placeholder="Search" onClick={this._search} />
				        </div>
				      </form>
				      <ul className="nav navbar-nav navbar-right">
				        <li>
					        <Badge
						      badgeContent={6}
						      primary={true}>
						    	<Link to={`/notifications`}>
						      		<NotificationsIcon />
					   			</Link>
					   		</Badge>
					    </li>
				        <li><Link to={`/profile/activityfeed`}>Profile</Link></li>
				        <li><Link to={`/signout`}>Sign out</Link></li>
				      </ul>
				    </div>
				  </div>
				</div>
				<div className="col-lg-9">
		          <div className="panel panel-default">
		          
					{this.props.children}
					
			      </div>
        		</div>
        		<div className="col-lg-3">
		          <MockChat />
		        </div>
			</div>
		
		);
	}
});

export default Header;