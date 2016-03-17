import React from 'react';
import CommentAction from '../../actions/ActivityFeed/CommentAction';
import Comment from './Comment.react';
import CommentStore from '../../stores/CommentStore';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

var CommentList = React.createClass({
    getInitialState: function () {
        return {
            data: CommentStore.getCommentsData()
        }
    },
    
    componentDidMount: function () {
        CommentStore.addChangeListener(this._onChange);
        CommentAction.getComments();
    },

    _onChange: function () {
        this.setState({data: CommentStore.getCommentsData()});
    },

    _renderSearchItem: function () {
        console.log(this.state.data);
        return this.state.data.map((comment) => {
            return (<Comment key={comment.id} commentId={comment.id} firstName={comment.firstname} commentText={comment.comment_txt} />);
        });
    },

    render: function () {
        return (
            <div>
            {this._renderSearchItem()}
            </div>
        );
    }
});

export default CommentList;