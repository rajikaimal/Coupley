import React from 'react';
import Match from './Match.react';
import List from 'material-ui/lib/lists/list';
import MatchStore from '../../../stores/MatchStore';
import MatchActions from '../../../actions/MatchActions';

const MatchContainer = React.createClass({
    getInitialState: function () {
        return {
            feed: MatchStore.getBlockList()
        }
    },
    componentDidMount: function () {
        MatchStore.addChangeListener(this._onChange);
        MatchActions.getBlockList();
    },
    _onChange: function () {
        this.setState({
            feed: MatchStore.getBlockList()
        })
    },
    _handleEdit: function (id) {
        console.log(id);
    },
    _handleRemove: function (username) {
        console.log(username);
        MatchActions.unblock(username);
    },
  _renderActivites: function() {
      console.log('Loggin feed ...');
      console.log(this.state.feed);
      return this.state.feed.map((Match) => {
        return (
              <Match key={Match.id} image={Match.image} onEdit={this._handleEdit} onRemove={this._handleRemove} id={Match.id} 
                firstname={Match.firstname}
                lastname={Match.lastname}
                username={Match.username}
                image={'/img/profilepics/' + Match.profilepic}
              />
        );
      });
  },
  render: function() {
    return (
      <div>
          <List subheader="Blocked users">
          {this._renderActivites()}
        </List>
      </div>
    );
  }
});

export default MatchContainer;
