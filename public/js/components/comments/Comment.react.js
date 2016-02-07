import React from 'react';
import CommentAction from '../../actions/ActivityFeed/CommentAction';

var Comment = React.createClass({
  render: function() {
    return (
      <div>
        <p>
		      <b>{this.props.firstname}</b><br/>
             {this.props.comment_txt}
		    </p>
      </div>
    );
  }
});

export default Comment;
