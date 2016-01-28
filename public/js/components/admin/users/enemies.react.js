/**
 * Created by Isuru 1 on 26/01/2016.
 */

import SearchItem from '../../search/SearchItem.react';
import SearchStore from '../../../stores/admin/SearchStore';
import UserActions from '../../../actions/admin/BlockedUsersActions';
import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import styles from 'material-ui/lib/styles';
import FontIcon from 'material-ui/lib/font-icon';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const colors = styles.Colors;

var AvatarExampleSimple = React.createClass({
    getInitialState: function () {
        return {
            results: SearchStore.getresults()
        }
    },
    componentDidMount: function () {
        SearchStore.addChangeListener(this._onChange);
    },
    _search: function () {

        UserActions.getsearchresults();
    },
    _onChange: function () {
        this.setState({
            results: SearchStore.getresults()
        });
    },
    _renderSearchItem: function () {
        console.log(this.state.results);
        return this.state.results.map((result) => {
            return (<SearchItem key={result.id} username={result.username} firstname={result.firstname} lastname={result.lastname} gender={result.gender} />);
        });
    },
    render: function () {
        return (
            <div onLoad={this._search()}>
			{this._renderSearchItem()}
            </div>
        );
    }

});


export default AvatarExampleSimple;
