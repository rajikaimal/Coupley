import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActivityfeedAction from '../../../actions/ActivityFeed/ActivityfeedAction';
import StatusStore from '../../../stores/StatusStore';
import ActivityList from './activityListComp.react';
import RaisedButton from 'material-ui/lib/raised-button';

const activityContainer = React.createClass({

  getInitialState: function() {
    return {
      results: StatusStore.getprofilePosts()
    }
  },
  componentDidMount: function() {
    StatusStore.addChangeListener(this._onChange);
    if(this.state.results == undefined) {
      let username = localStorage.getItem('username');
      //ActivityFeedActions.loadposts(username);
    }
  },
  componentWillUnmount: function() {
    
  },
  _onChange: function() {
    console.log('LALALALLA');
    console.log(StatusStore.getprofilePosts());
    this.setState({results: StatusStore.getprofilePosts()});
  },
  _renderActivity: function () {
        if(this.state.results == undefined) {

        } else {
          return this.state.results.map((result) => {
              return (<ActivityList key={result.id} id={result.id} firstname={result.firstname} post_text={result.post_text} created_at={result.created_at} image={result.attachment} />);
          });

        }
  },
  _loadMore: function() {
    let username = localStorage.getItem('username');
    //ActivityFeedActions.loadmore(username);
  },

  render: function() {
    return (
     <div>
      {this._renderActivity()}
      <RaisedButton label="Load more" primary={true} onClick={this._loadMore}/>  
     </div>
    );
  }
});

export default activityContainer;
