import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import PreviousChat from './ChatPrevious.react';
import ThreadActions from '../../actions/Thread/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';


const ListStyle={
  width: 300,
  height:635,
}

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
       return(
     <List subheader="Previous Chat" style={ListStyle} zDepth={1}>
     <div>
      {this._renderSearchItem()}
     </div>
     </List>
    );
  }
});

export default PreviousChatContainer;
