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


const TableRaw = React.createClass({
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
            </tr>

        )}
});

export default TableRaw;