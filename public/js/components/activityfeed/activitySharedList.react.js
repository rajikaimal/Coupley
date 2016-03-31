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
                        <ListItem
                            leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
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
                            (this.props.attachment!='None') ? <div>
                                                                <CardMedia>
                                                                <img src={'img/activityFeedPics/'+ this.props.sattachment} />
                                                                </CardMedia>
                                                              </div> : ''
                        }
                      </div>
                        <Divider inset={true} />
                    </Card>   
                  </div>
            </div>
        );
    }
});

export default ActivitySharedList;