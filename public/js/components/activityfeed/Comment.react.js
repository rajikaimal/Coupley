import React from 'react';
import CommentAction from '../../actions/ActivityFeed/CommentAction';
import CommentStore from '../../stores/CommentStore';
import Card from 'material-ui/lib/card/card';
import ListItem from 'material-ui/lib/lists/list-item';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';

var Comment = React.createClass({
    render: function () {
        return (
            <div>
                <Card>
                    <ListItem
                        leftAvatar={<Avatar src="http://www.db18.com/hairstyles/hairstylepics/boys/boy_hairstyle_112.jpg" />}
                        primaryText={this.props.firstName}
                        secondaryText={<p>{this.props.commentText}</p>}
                        secondaryTextLines={1} />
                    <Divider inset={true} />
                </Card>
            </div>
        );
    }
});

export default Comment;


