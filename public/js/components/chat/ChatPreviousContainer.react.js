import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import PreviousChat from './ChatPrevious.react';
import ThreadActions from '../../actions/Thread/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';


const PreviousChatContainer=React.createClass({

  getInitialState: function() {
    return {
      results:ThreadStore.getpreviousmessage()
      }
  },
  componentDidMount: function() {
    ThreadStore.addChangeListener(this._onChange);
    ThreadActions.getpreviousmessage();
  },
  // _search: function () {
  //   ActivityFeedActions.getstatus();
  // },
  _onChange: function() {
    this.setState({results:ThreadStore.getpreviousmessage()});
  },
  _renderSearchItem: function () {
        console.log(this.state.results);
        return this.state.results.map((result) => {
            return (<PreviousChat key={result.id} id={result.id} firstname={result.user2} message={result.message} created_at={result.created_at}/>);
        });
  },

  render: function() {
    return (
     <div>
      {this._renderSearchItem()}
     </div>
    );
  }
});

export default PreviousChatContainer;
