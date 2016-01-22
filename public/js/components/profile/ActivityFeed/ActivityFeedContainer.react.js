import React from 'react';
import Activity from './Activity.react';
import List from 'material-ui/lib/lists/list';

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
  _renderActivites: function() {
  	return ActivityData.map((activity) => {
  		return (
  			<Activity key={activity.time} heading={activity.heading} time={activity.time} date={activity.date} description={activity.description} />
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