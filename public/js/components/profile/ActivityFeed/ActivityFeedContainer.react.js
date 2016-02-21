import React from 'react';
import Activity from './Activity.react';
import List from 'material-ui/lib/lists/list';
import ActivityFeedStore from '../../../stores/ActivityFeedStore';
import ActivityFeedActions from '../../../actions/profile/ActivityFeedActions';

const ActivityFeedContainer = React.createClass({
  getInitialState: function() {
    return {
      feed: ActivityFeedStore.getfeed()
    }
  },
  componentDidMount: function() {    
    ActivityFeedStore.addChangeListener(this._onChange);
    ActivityFeedActions.getfeed();
  },
  _onChange: function() {
    this.setState({
      feed: ActivityFeedStore.getfeed()
    })
  },
  _handleEdit: function(id) {
    console.log('Edit ....' + id);
  },
  _handleRemove: function(id) {
    console.log('Clicked !!! ,,,,' + id);
  },
  _renderActivites: function() {
    console.log('Loggin feed ...');
    console.log(this.state.feed);

    return this.state.feed.map((activity) => {
  		return (
  			<Activity key={activity.id} onEdit={this._handleEdit} onRemove={this._handleRemove} id={activity.id} post={activity.post} time={activity.created_at} />
  		);
  	});
  },
  render: function() {
    return (
      <div>
		  <List subheader="Today">
        	{this._renderActivites()}
        </List>
      </div>
    );
  }
});

export default ActivityFeedContainer;
