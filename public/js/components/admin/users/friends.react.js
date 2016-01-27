/**
 * Created by Isuru 1 on 26/01/2016.
 */
import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import styles from 'material-ui/lib/styles';
import FontIcon from 'material-ui/lib/font-icon';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const colors = styles.Colors;

var AvatarExampleSimple = React.createClass({
    render: function () {
        return (
            <div className="pull-left col-lg-6">
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar src="http://www.belgraviacentre.com/wp-content/uploads/2013/03/1047918111-Happy-man.jpg" />
                            }
                    >
                        Image Avatar
                    </ListItem>
                </List>
            </div>
        );
    }

});


export default AvatarExampleSimple;
