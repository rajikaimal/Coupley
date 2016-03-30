import React from 'react';
import BlockItem from './BlockItem.react';
import List from 'material-ui/lib/lists/list';
import ActivityFeedStore from '../../stores/ActivityFeedStore';
import ActivityFeedActions from '../../actions/profile/ActivityFeedActions';

const BlockList = React.createClass({
    getInitialState: function () {
        return {
            feed: ActivityFeedStore.getfeed()
        }
    },
    componentDidMount: function () {
        ActivityFeedStore.addChangeListener(this._onChange);
        ActivityFeedActions.getfeed();
    },
    _onChange: function () {
        this.setState({
            feed: ActivityFeedStore.getfeed()
        })
    },
    _handleEdit: function (id) {
        console.log('Edit ....' + id);
    },
    _handleRemove: function (id) {
        console.log('Clicked !!! ,,,,' + id);
    },
  _renderActivites: function() {
      console.log('Loggin feed ...');
      console.log(this.state.feed);

      return this.state.feed.map((activity) => {
  		return (
            <BlockItem key={activity.id} onEdit={this._handleEdit} onRemove={this._handleRemove} id={activity.id} post={activity.post} time={activity.created_at} />
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

export default BlockList;
