import React from 'react';
import Activity from './Like.react';
import List from 'material-ui/lib/lists/list';
import LikeStore from '../../stores/LikeStore';
import LikeActions from '../../actions/LikeActions';

const ActivityFeedContainer = React.createClass({
    getInitialState: function () {
        return {
            list: LikeStore.getList()
        }
    },
    componentDidMount: function () {
        LikeStore.addChangeListener(this._onChange);
        LikeActions.getList();
    },
    _onChange: function () {
        console.log(LikeStore.getList());
        this.setState({
            list: LikeStore.getList()
        })
    },
    _handleEdit: function (id) {
        console.log(id);
    },
    _handleRemove: function (username) {
        console.log(username);
        LikeActions.unblock(username);
    },
  _renderActivites: function() {
      console.log('Loggin feed ...');
      console.log(this.state.list);
      return this.state.list.map((item) => {
        return (
              <Activity key={item.id}  onEdit={this._handleEdit} onRemove={this._handleRemove} id={item.id}
                username={item.username}
                firstname={item.firstname}
                lastname={item.lastname}
                image={'/img/profilepics/' + item.user2}
              />
        );
      });
  },
  render: function() {
    return (
      <div>
          <div className="col-lg-4">
            <List subheader="User you have liked">
            {this._renderActivites()}
            </List>
          </div>
          <div className="col-lg-4">
            <List subheader="User who liked you">
            {this._renderActivites()}
            </List>
          </div>
      </div>
    );
  }
});

export default ActivityFeedContainer;
