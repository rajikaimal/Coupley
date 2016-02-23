import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


const style = {
    margin: 12,
};


var ChatCard = React.createClass({

    render: function () {
        return (
            <Card>
                <CardTitle title="" subtitle="" />
                <CardText>
                    <TextField hintText="Message" fullWidth={true}/>
                </CardText>
                <CardActions>
                    <FlatButton label="Send message"  style={this.style}/>
                </CardActions>
            </Card>
        );
    }
});

export default ChatCard;
