import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import CommentAction from '../../actions/ActivityFeed/CommentAction';
import Comment from './Comment.react';
import CommentStore from '../../stores/CommentStore';

var CommentList = React.createClass({

  getInitialState: function() {
    return {
      results: CommentStore.getCommentsData()
      }
  },
  componentDidMount: function() {
    CommentStore.addChangeListener(this._onChange);
    CommentAction.getcomments();
  },
  _search: function () {
    CommentAction.getcomments();
  },
  _onChange: function() {
    this.setState({results: CommentStore.getCommentsData()});    
  },
  _renderSearchItem: function () {
        console.log(this.state.results); 
        return this.state.results.map((comment) => {
            return (<Comment key={comment.id} cid={comment.id} firstname={comment.firstname} comment_txt={comment.comment_txt} />);
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

export default CommentList;