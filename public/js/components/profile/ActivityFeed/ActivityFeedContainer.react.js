import React from 'react';
import Activity from './Activity.react';
import List from 'material-ui/lib/lists/list';
import ActivityFeedStore from '../../../stores/ActivityFeedStore';
import ActivityFeedActions from '../../../actions/profile/ActivityFeedActions';

const ActivityData = [{
	"heading": "Brunch for this weekday ? ",
	"time": "06",
	"date": "2016.02.06",
	"description": "Sample description"
},{
	"heading": "Netflix and Chill ?",
	"time": "07",
	"date": "2016.03.20",
	"description": "Sample description"
},{
	"heading": "Yayyyyy ?",
	"time": "08",
	"date": "2016.03.20",
	"description": "Sample description"
}];


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
  _renderActivites: function() {
  	console.log(this.state.feed);
   //  return Array.from(this.state.feed).map((activity) => {
  	// 	return (
  	// 		<Activity key={activity.id} />
  	// 	);
  	// });
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