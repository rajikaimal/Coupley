import React from 'react';
import { Link } from 'react-router'
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';
import MockChat from '../profile/MockChat.react';
import Feeback from '../feedback/feedback.react';
import MessageIcon from 'material-ui/lib/svg-icons/action/speaker-notes';
import LoginStore from '../../stores/LoginStore';
import ProfileStore from '../../stores/ProfileStore';
import HeaderActions from '../../actions/HeaderActions';
import Snackbar from 'material-ui/lib/snackbar';
import NotificationStore from '../../stores/NotificationStore';
import NotificationAction from '../../actions/NotificationActions';
import NotificationContainer from '../notifications/NotificationContainer.react';
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  popover: {
    padding: 20,
  },
};

const Header = React.createClass({
	getInitialState: function() {
		return {
			firstname: LoginStore.getFirstname(),
			notificationCount: NotificationStore.getNumber(),
			error: false,
			open: false
		}
	},
	componentDidMount: function() {	
		var user1 = localStorage.getItem('username');
		socket.emit('LoggedUser', user1);

		LoginStore.addChangeListener(this._onChange);
		ProfileStore.addChangeListener(this._onChange);
		//HeaderActions.getprofilename(LoginStore.getEmail());
		NotificationAction.getInitialNo();
		NotificationStore.addChangeListener(this._onChangeNotification);
		var self = this;
		socket.on('notifylike', function(data) {
			console.log('Got like notification');
			console.log(data);
			self.setState({
				notificationCount: ++self.state.notificationCount
			});
		});
	},
	_changeURL: function() {
		document.location = "/#/search";
	},
	_search: function() {
		let searchkey = this.refs.search.value;
		HeaderActions.getSearchResults(searchkey);
	},
	_onChange: function() {
	    this.setState({ 
	    	firstname: LoginStore.getFirstname(),
	    	error: ProfileStore.getErrorStatus()
	    });
	},
	_onChangeNotification: function() {
		this.setState({
			notificationCount: NotificationStore.getNumber()
		});
	},
	_clearNotifications: function(event) {
		this.setState({
	      open: !this.state.open,
	      anchorEl: event.currentTarget,
	    });
	},
	handleRequestClose: function() {
	    this.setState({
	      open: false,
	    });
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
						      badgeContent={this.state.notificationCount}
						      primary={true} onClick={this._clearNotifications}>
						    	
						      		<NotificationsIcon />
					   			
					   		</Badge>
					    </li>
				        <li>
				        	<Badge
						      badgeContent={3}
						      primary={true}>
						    	<Link to={`/threads`}>
						      		<MessageIcon />
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
		          
		          
					{this.props.children}
					
			      
        		</div>
        		<div className="col-lg-3">
		          <MockChat />
		          <Feeback />
		        </div>
		        <Snackbar
                    open={this.state.error}
                    message="Error occured please try again later !"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
                <div>
			        <Popover
			          open={this.state.open}
			          anchorEl={this.state.anchorEl}
			          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			          targetOrigin={{horizontal: 'left', vertical: 'top'}}
			          onRequestClose={this.handleRequestClose}
			          animation={PopoverAnimationFromTop}
			        >
			          <div style={styles.popover}>
			            <NotificationContainer />
			          </div>
			        </Popover>
			    </div>
			</div>
		);
	}
});

export default Header;