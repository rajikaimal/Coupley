import React from 'react';
import Activity from './BlockList.react';
import List from 'material-ui/lib/lists/list';
import ProfileStore from '../../../stores/ProfileStore';
import ProfileActions from '../../../actions/profile/ProfileActions';

const ActivityFeedContainer = React.createClass({
    getInitialState: function () {
        return {
            feed: ProfileStore.getBlockList()
        }
    },
    componentDidMount: function () {
        ProfileStore.addChangeListener(this._onChange);
        ProfileActions.getBlockList();
    },
    _onChange: function () {
        this.setState({
            feed: ProfileStore.getBlockList()
        })
    },
    _handleEdit: function (id) {
        console.log(id);
    },
    _handleRemove: function (username) {
        console.log(username);
        ProfileActions.unblock(username);
    },
  _renderActivites: function() {
      console.log('Loggin feed ...');
      console.log(this.state.feed);
      return this.state.feed.map((activity) => {
    		return (
              <Activity key={activity.id} image={activity.image} onEdit={this._handleEdit} onRemove={this._handleRemove} id={activity.id} 
                firstname={activity.firstname}
                lastname={activity.lastname}
                username={activity.username}
                image={'/img/profilepics/' + activity.profilepic}
              />
    		);
      });
  },
  render: function() {
    return (
      <div>
          <List subheader="Blocked users">
        	{this._renderActivites()}
        </List>
      </div>
    );
  }
});

export default ActivityFeedContainer;
