import React from 'react';
import Activity from './Like.react';
import List from 'material-ui/lib/lists/list';
import LikeStore from '../../stores/LikeStore';
import LikeActions from '../../actions/LikeActions';

const loadMoreStyle = {
  marginLeft: 100
}

const ActivityFeedContainer = React.createClass({
    getInitialState: function () {
        return {
            list: LikeStore.getList(),
            listMe: LikeStore.getListMe(),
            listLikedBack: LikeStore.getLikedBackList()
        }
    },
    componentDidMount: function () {
        LikeStore.addChangeListener(this._onChange);
        LikeActions.getList();
        LikeActions.getListLikedMe();
        LikeActions.getLikedBackList();
    },
    _onChange: function () {
        console.log(LikeStore.getList());
        this.setState({
            list: LikeStore.getList(),
            listMe: LikeStore.getListMe(),
            listLikedBack: LikeStore.getLikedBackList()
        })
    },
    _handleEdit: function (id) {
        console.log(id);
    },
    _handleRemove: function (username) {
        console.log(username);
        LikeActions.unblock(username);
    },
    _loadMoreLiked: function() {
        LikeActions.getList();
    },
    _loadMoreGotLiked: function() {
        LikeActions.getListLikedMe();
    },
    _loadMoreLikedBack: function() {
        LikeActions.getLikedBackList();
    },
  _renderILike: function() {
    return this.state.list.map((item) => {
      return (
            <Activity key={item.id}  onEdit={this._handleEdit} onRemove={this._handleRemove} id={item.id}
              username={item.username}
              firstname={item.firstname}
              lastname={item.lastname}
              image={'/img/profilepics/' + item.profilepic}
            />
      );
    });
  },
  _renderWhoLikedMe: function() {
    return this.state.listMe.map((item) => {
      return (
            <Activity key={item.id}  onEdit={this._handleEdit} onRemove={this._handleRemove} id={item.id}
              username={item.username}
              firstname={item.firstname}
              lastname={item.lastname}
              image={'/img/profilepics/' + item.profilepic}
            />
      );
    });
  },
  _renderBackList: function() {
    return this.state.listLikedBack.map((item) => {
      return (
            <Activity key={item.id}  onEdit={this._handleEdit} onRemove={this._handleRemove} id={item.id}
              username={item.username}
              firstname={item.firstname}
              lastname={item.lastname}
              image={'/img/profilepics/' + item.profilepic}
            />
      );
    });
  },
  render: function() {
    return (
      <div>
          <div className="col-lg-4" >
            <List subheader="You have liked ...">
            {this._renderILike()}
            </List>
            <button onClick={this._loadMoreLiked} style={loadMoreStyle}> load more </button>
          </div>
          <div className="col-lg-4">
            <List subheader="You got liked by ...">
            {this._renderWhoLikedMe()}
            </List>
            <button onClick={this._loadMoreGotLiked} style={loadMoreStyle}> load more </button>
          </div>
          <div className="col-lg-4">
            <List subheader="Who liked back you ...">
            {this._renderBackList()}
            </List>
            <button onClick={this._loadMoreLikedBack} style={loadMoreStyle}> load more </button>
          </div>
      </div>
    );
  }
});

export default ActivityFeedContainer;