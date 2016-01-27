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
            <div styles={"marginTop=0px"}>
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar src="http://www.belgraviacentre.com/wp-content/uploads/2013/03/1047918111-Happy-man.jpg" />
                            }
                    >
                        Image Avatar
                    </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar icon={<FileFolder />} />
                            }
                    >
                        SvgIcon Avatar
                    </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar
                                icon={<FileFolder />}
                                color={colors.orange200}
                                backgroundColor={colors.pink400}
                            />
                            }
                    >
                        SvgIcon Avatar with custom colors
                    </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
                            }
                    >
                        FontIcon Avatar
                    </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar
                                icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
                                color={colors.blue300}
                                backgroundColor={colors.indigo900}
                            />
                            }
                    >
                        FontIcon Avatar with custom colors
                    </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={<Avatar>A</Avatar>}
                    >
                        Letter Avatar
                    </ListItem>
                    <ListItem
                        disabled={true}
                        leftAvatar={
                            <Avatar
                                color={colors.deepOrange300}
                                backgroundColor={colors.purple500}
                            >
                                A
                            </Avatar>
                            }
                    >
                        Letter Avatar with custom colors
                    </ListItem>
                </List>
            </div>
        );
    }

});


export default AvatarExampleSimple;
