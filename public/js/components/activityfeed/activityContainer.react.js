import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActivityFeedActions from '../../actions/ActivityFeed/ActivityFeedActions';
import ActivityFeedStore from '../../stores/ActivityFeedStore';
import ActivityList from './activityListComp.react';

const activityContainer = React.createClass({

  getInitialState: function() {
    return {
      results: ActivityFeedStore.getStatusData()
      }
  },
  componentDidMount: function() {
    ActivityFeedStore.addChangeListener(this._onChange);
    ActivityFeedActions.getstatus();
  },
  _search: function () {
    ActivityFeedActions.getstatus();
  },
  _onChange: function() {
    this.setState({results: ActivityFeedStore.getStatusData()});        
  },
  _renderSearchItem: function () {
        console.log(this.state.results); 
        return this.state.results.map((result) => {
            return (<ActivityList key={result.id} firstname={result.firstname} post_text={result.post_text} created_at={result.created_at}/>);
        });
  },

  render: function() {
    return (
     <div>
      {this._renderSearchItem()}
     </div>
    );
  }
});

export default activityContainer;
