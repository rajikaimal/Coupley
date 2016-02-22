import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

const style = {
    margin: 500
}

const FloatingButton = React.createClass({
    render: function () {
        return (
            <div>
                <FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={false}  style={style} />
            </div>
        );
    }
});

export default FloatingButton;
