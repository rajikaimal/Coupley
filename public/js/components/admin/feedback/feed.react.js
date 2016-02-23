/**
 * Created by Isuru 1 on 07/02/2016.
 */

import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';
import FeedActions from '../../../actions/admin/FeedbackActions';

const style = {
    margin: 2
};

const TableRaw = React.createClass({
    _handleFeedId: function () {

        let credentials = {
            id: this.props.id
        };
        swal({
                title: "Are you sure?",
                text: "Do you really want to mark as done this Feedback?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Mark!",
                cancelButtonText: "No, Cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    swal("Done!", "This feedback is marked as done.", "success");
                    FeedActions.MarkAsDone(credentials);
                } else {
                    swal("Cancelled", "Feedback is not marked as done", "error");
                }
            });

    },
    render: function () {
        let {
            id,
            user,
            description
            } = this.props;
        return (

            <tr>
                <td>{id}</td>
                <td>{user}</td>
                <td>{description}</td>
                <td>
                    <RaisedButton label="Mark as done" secondary={true} style={style} onTouchTap={this._handleFeedId} />
                </td>
            </tr>

        )}
});

export default TableRaw;