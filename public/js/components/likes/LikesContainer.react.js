import React from 'react';
import Activity from './Like.react';
import List from 'material-ui/lib/lists/list';
import LikeStore from '../../stores/LikeStore';
import LikeActions from '../../actions/LikeActions';
import TextField from 'material-ui/lib/text-field';

const loadMoreStyle = {
  marginLeft: 100
}

const textStyle = {
  marginLeft: 20
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
    _handleSearchliked: function() {
      let searchVal = this.refs.iliked.getValue();
      LikeActions.searchLikedMe(searchVal);
    },
    _handleSearchlikedMe: function() {
      let searchVal = this.refs.likedme.getValue();
      LikeActions.searchGotLiked(searchVal);
    },
    _handleSearchlikedBack: function() {
      let searchVal = this.refs.likedback.getValue();
      LikeActions.searchLikedBack(searchVal);      
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
            <TextField
                    ref="iliked" hintText="search ..." onKeyUp={this._handleSearchliked} style={textStyle}/>
            {this._renderILike()}
            </List>
            <button onClick={this._loadMoreLiked} style={loadMoreStyle}> load more </button>
          </div>
          <div className="col-lg-4">
            <List subheader="You got liked by ...">
            <TextField
                    ref="likedme" hintText="search ..." onKeyUp={this._handleSearchlikedMe} style={textStyle}/>
            {this._renderWhoLikedMe()}
            </List>
            <button onClick={this._loadMoreGotLiked} style={loadMoreStyle}> load more </button>
          </div>
          <div className="col-lg-4">
            <List subheader="Who liked back you ...">
            <TextField
                    ref="likedback" hintText="search ..." onKeyUp={this._handleSearchlikedBack} style={textStyle}/>
            {this._renderBackList()}
            </List>
            <button onClick={this._loadMoreLikedBack} style={loadMoreStyle}> load more </button>
          </div>
      </div>
    );
  }
});

export default ActivityFeedContainer;