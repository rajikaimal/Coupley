import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import RaisedButton from 'material-ui/lib/raised-button';
import ActivityfeedAction from '../../actions/ActivityFeed/ActivityfeedAction';
import StatusStore from '../../stores/StatusStore';
import ActivityList from './activityListComp.react';
import LoginStore from '../../stores/LoginStore';

const style = {
  marginLeft: 40,
  width: 800,
};

const activityContainer = React.createClass({
  getInitialState: function() {
    return {
      results: StatusStore.getStatusData(),
    }
  },

  componentDidMount: function() {
    StatusStore.addChangeListener(this._onChange);

    let data = {
      userId: localStorage.getItem('userid'),
    };
    ActivityfeedAction._getStatus(data);

  },

  _onChange: function () {
    this.setState({results: StatusStore.getStatusData()});
  },

  _loadMorePosts: function () {
    let data = {
      userId: localStorage.getItem('userid'),
    };
    ActivityfeedAction._getStatus(data);
  },

  _renderSearchItem: function () { 
    return this.state.results.map((result) => {
      return (<ActivityList key={result.id} 
                            id={result.id} 
                            type={result.type} 
                            firstName={result.firstname} 
                            username={result.username}
                            postId={result.post_id} 
                            attachment={result.attachment} 
                            lPostId={result.pid} 
                            postText={result.post_text} 
                            created_at={result.created_at}
                            postid={result.postid}
                            likesCount={result.likesCount}
                            sid={result.sid}
                            sfirstname={result.sfirstname}
                            susername={result.susername}
                            sattachment={result.sattachment}
                            spost_text={result.spost_text}
                            screated_at={result.screated_at}/>);     
    });
  },

  render: function() {
    return (
      <div>
        <div>
          {this._renderSearchItem()}
        </div>
        <div>
          <RaisedButton label="load more posts" secondary={true} style={style} onClick={this._loadMorePosts} />
        </div>
      </div>
    );
  }
});

export default activityContainer;