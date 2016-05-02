import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';

const style1 = {
  width: 700,
  margin: 40,
};

const ActivitySharedList = React.createClass({
    render: function () {
        return (
            <div style={style1}>
                <div>
                    <Card>
                        <div>
                            {(this.props.sid) ? <div>
                                                    <ListItem
                                                        leftAvatar={<Avatar src={'img/profilepics/'+ this.props.susername} />}
                                                        primaryText={this.props.sfirstname}
                                                        secondaryText={
                                                            <p>
                                                            <b>{this.props.screated_at}</b>
                                                            </p>
                                                        }
                                                        secondaryTextLines={1}  />

                                                        <CardText>
                                                            {this.props.spost_text}
                                                        </CardText>

                                                        <div>
                                                            {
                                                            (this.props.sattachment!='None') ? <div>
                                                                                                    <CardMedia>
                                                                                                        <img src={'img/activityFeedPics/'+ this.props.sattachment} />
                                                                                                    </CardMedia>
                                                                                                </div> : ''
                                                            }
                                                            </div>
                                                            <Divider inset={true} />
                                                    </div> : <div>
                                                                <ListItem
                                                                    primaryText="Attachment Unavailable"/>
                                                                    <CardText>
                                                                        This attachment may have been removed or the person who shared it may not have permission to share it with you
                                                                    </CardText>
                                                                <Divider inset={true} />
                                                             </div>}
                        </div>
                    </Card>   
                  </div>
            </div>
        );
    }
});

export default ActivitySharedList;