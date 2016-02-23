import React from 'react';
import { Link } from 'react-router'
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';
import MockChat from '../profile/MockChat.react';
import LoginStore from '../../stores/LoginStore';
import HeaderActions from '../../actions/HeaderActions';

const Header = React.createClass({
	getInitialState: function() {
		return {
			firstname: LoginStore.getFirstname()
		}
	},
	componentDidMount: function() {
		LoginStore.addChangeListener(this._onChange);
		//HeaderActions.getprofilename(LoginStore.getEmail());
	},
	_changeURL: function() {
		document.location = "/#/search";
	},
	_search: function() {
		let searchkey = this.refs.search.value;
		HeaderActions.getsearchresults(searchkey);
	},
	_onChange: function() {
	    this.setState({ firstname: LoginStore.getFirstname() });
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
				          <input type="text" className="form-control col-md-8" placeholder="Search" onClick={this._changeURL} onKeyUp={this._search} ref="search"/>
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
				        <li><Link to={`/profile/activityfeed`}>{this.state.firstname}</Link></li>
                          <li>
                              <Link to={`/logout`}>Sign out</Link>
                          </li>
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