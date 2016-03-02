import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActivityFeedActions from '../../../actions/ActivityFeed/ActivityFeedActions';
import StatusStore from '../../../stores/StatusStore';
import ActivityList from './activityListComp.react';
import RaisedButton from 'material-ui/lib/raised-button';

const activityContainer = React.createClass({

  getInitialState: function() {
    return {
      posts: StatusStore.getprofilePosts()
    }
  },
  componentDidMount: function() {
    StatusStore.addChangeListener(this._onChange);
    ActivityFeedActions.loadPosts(localStorage.getItem('username'));
  },
  _onChange: function() {
    if(this.state.result) {
      this.setState({posts: StatusStore.getPaginationResults()});
    } else {
      this.setState({posts: StatusStore.getprofilePosts()});
    }
  },
  _renderActivity: function () {
        if(this.state.posts) {
          return this.state.posts.map((result) => {
              return (<ActivityList key={result.id} id={result.id} firstname={result.firstname} post_text={result.post_text} created_at={result.created_at} image={result.attachment} />);
          });
        }
  },
  _loadMore: function() {
    let username = localStorage.getItem('username');
    this.setState({
      posts: StatusStore.getPaginationResults()
    });
  },

  render: function() {
    return (
     <div>
      {this._renderActivity()}
      <RaisedButton label="load more" primary={true} onClick={this._loadMore}/>  
     </div>
    );
  }
});

export default activityContainer;
