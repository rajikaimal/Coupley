import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActivityfeedAction from '../../actions/ActivityFeed/ActivityfeedAction';
import StatusStore from '../../stores/StatusStore';
import ActivityList from './activityListComp.react';
import CommentList from './CommentList.react';
import LoginStore from '../../stores/LoginStore';

const activityContainer = React.createClass({

  getInitialState: function() {
    return {
      results: StatusStore.getStatusData()
      }
  },

  componentDidMount: function() {
    StatusStore.addChangeListener(this._onChange);
    ActivityfeedAction.getstatus();
  },

  _onChange: function () {
    this.setState({results: StatusStore.getStatusData()});        
  },

  _renderSearchItem: function () {
        console.log(this.state.results); 
        return this.state.results.map((result) => {
            return (<ActivityList key={result.id} id={result.id} firstname={result.firstname} post_text={result.post_text} created_at={result.created_at}/>);
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
