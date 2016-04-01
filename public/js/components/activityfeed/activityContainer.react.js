import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActivityfeedAction from '../../actions/ActivityFeed/ActivityfeedAction';
import StatusStore from '../../stores/StatusStore';
import ActivityList from './activityListComp.react';
import LoginStore from '../../stores/LoginStore';

const activityContainer = React.createClass({
  getInitialState: function() {
    return {
      userId: StatusStore.getLoggedUId(),
      results: StatusStore.getStatusData(),
    }
  },

  componentDidMount: function() {
    StatusStore.addChangeListener(this._onChange);
    ActivityfeedAction._getUserId();

    let data = {
      //userId: StatusStore.getLoggedUId(),
      userId: 11,
    };
    ActivityfeedAction._getStatus(data);

  },

  _onChange: function () {
    this.setState({results: StatusStore.getStatusData()});
    this.setState({userId: StatusStore.getLoggedUId()});  
  },

  _renderSearchItem: function () { 
    return this.state.results.map((result) => {
      return (<ActivityList key={result.id} 
                            id={result.id} 
                            type={result.type} 
                            firstName={result.firstname} 
                            postId={result.post_id} 
                            attachment={result.attachment} 
                            lPostId={result.pid} 
                            postText={result.post_text} 
                            created_at={result.created_at}
                            postid={result.postid}
                            likesCount={result.likesCount}
                            sid={result.sid}
                            sfirstname={result.sfirstname}
                            sattachment={result.sattachment}
                            spost_text={result.spost_text}
                            screated_at={result.screated_at}/>);     
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