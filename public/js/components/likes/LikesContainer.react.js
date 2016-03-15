import React from 'react';
import Like from './Like.react';
import List from 'material-ui/lib/lists/list';
// import LikeAction from '../../actions/LikeActions';
// import LikeStore from '../../stores/LikeStore';

const LikesContainer = React.createClass({
  getIntitialState: function() {
    this.state = {
      value: "a",
    };
  },
  componentDidMount:function() {
  
  },
  _onChange: function() {
  
  },

  handleChange: function(value) {
    this.setState({
      value: value,
    });
  },
  _renderList: function() {
    return this.state.feed.map((activity) => {
      return (
            <Activity key={activity.id} image={activity.image} onEdit={this._handleEdit} onRemove={this._handleRemove} id={activity.id} 
              firstname={activity.firstname}
              lastname={activity.lastname}
              username={activity.username}
              image={'/img/profilepics/' + activity.profilepic />
      );
    });
  },
  render: function() {
    return (
      <div>
        {this._renderList()}
      </div>
    );
  }
});

export default LikesContainer;

