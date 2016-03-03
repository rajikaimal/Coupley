import React from 'react';
import CommentAction from '../../actions/ActivityFeed/CommentAction';
import CommentList from './CommentList.react';

var Commentsbox = React.createClass({

  render: function() {
    return (
      <div>
        <CommentList />
      </div>
    );
  }
});

export default Commentsbox;