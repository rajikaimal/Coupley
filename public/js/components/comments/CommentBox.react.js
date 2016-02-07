import React from 'react';
import CommentAction from '../../actions/ActivityFeed/CommentAction';
import CommentList from './CommentList.react';
import CommentForm from './CommentForm.react';

var CommentBox = React.createClass({

  render: function() {
    return (
      <div>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

export default CommentBox;