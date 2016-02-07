import React from 'react';
import CommentAction from '../../actions/ActivityFeed/CommentAction';

var CommentForm = React.createClass({

  render: function() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

export default CommentForm;