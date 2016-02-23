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
import FeedActions from '../../../actions/admin/FeedbackActions';
import FeedStore from '../../../stores/admin/FeedbackStore';
import Feed from '../feedback/feed.react';
const ELSE='No any feedbacks regaurding activity feed.';
const Tables = React.createClass({
    getInitialState: function() {

        return {
            results: FeedStore.getresults()
        }
    },
    componentDidMount: function() {
        FeedActions.activityFeeds();
        FeedStore.addChangeListener(this._onChange);
    },
    _onChange: function() {
        if(this.isMounted()) {
        this.setState({
            results: FeedStore.getresults()
        })
        }
    },
    _renderFeedItem: function() {
        console.log(this.state.results);
        if(this.state.results){
        return this.state.results.map((result) => {
            return (<Feed key={result.id} id={result.id} user={result.user} description={result.description} />);
        })}
        else {
            return (<Feed
                id={ELSE}
            />
            );
        }
    },
    render: function () {
        return (
            <div>
                    <h1>Activity Feedback </h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th><h2>Id</h2></th>
                        <th><h2>User</h2></th>
                        <th><h2>Description</h2></th>
                    </tr>
                </thead>
                <tbody style={{fontSize: "18px"}}>

                {this._renderFeedItem()}

                </tbody>
            </table>
            </div>
        );
    }
});


export default Tables;
