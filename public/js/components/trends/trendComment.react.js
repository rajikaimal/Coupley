import React from 'react';
import Card from 'material-ui/lib/card/card';
import ListItem from 'material-ui/lib/lists/list-item';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';

let style1={
  width: 800,
};

var Comment = React.createClass({
    render: function () {
        return (
            <div style={style1}>
                <Card>
                    <ListItem
                        leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
                        primaryText={this.props.cfirstName}
                        secondaryText={<p>{this.props.comment_txt}</p>}
                        secondaryTextLines={1} />
                    <Divider inset={true} />
                </Card>
            </div>
        );
    }
});

export default Comment;
