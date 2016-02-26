/**
 * Created by Isuru 1 on 26/01/2016.
 */

import SearchItem from './friends/friend.react';

import SearchStore from '../../../stores/admin/SearchStore';
import UserActions from '../../../actions/admin/UsersActions';
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
      results: SearchStore.getresults(),
    };
  },

  componentDidMount: function () {
    UserActions.getsearchresults();
    SearchStore.addChangeListener(this._onChange);
  },

  componentWillUnmount:function () {
    SearchStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      results: SearchStore.getresults(),
    });
  },

  _renderSearchItem: function () {
    console.log(this.state.results);
    if (this.state.results) {
      return this.state.results.map((result) => {
        return (<div className="col-lg-4">
                            <SearchItem key={result} rowId={result.rowId} user={result.user} reported={result.reported}  description={result.description} id={result.reported_user_id} />
                    </div>);
      });
    }    else {
      return (<div className="col-lg-4">
                No any reported users found.
                  </div>);
    }
  },

  render: function () {
    return (
        <div>
            <h1>Reported Users</h1>
			{this._renderSearchItem()}
        </div>
    );
  },

});

export default AvatarExampleSimple;
