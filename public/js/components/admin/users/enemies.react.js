/**
 * Created by Isuru 1 on 26/01/2016.
 */
import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import styles from 'material-ui/lib/styles';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const colors = styles.Colors;

var enemies = React.createClass({
    render: function () {
        return (
            <div className="pull-right col-lg-6">
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar src="http://i.telegraph.co.uk/multimedia/archive/02552/rhinehart_2552984b.jpg" />
                            }
                    >
                        Image Avatar
                    </ListItem>
                </List>
            </div>
        );
    }

});


export default enemies;
