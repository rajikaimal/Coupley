import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import PreviousChat from './ChatPrevious.react';
import ThreadActions from '../../actions/Thread/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';


const ListStyle={
  width: 300,
  height:635,
}

const searchconvo={
  marginTop:'-18',
  paddingLeft:20,
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

  _onChange: function() {
    this.setState({results:ThreadStore.getpreviousmessage()});
  },
  previousMList: function () {
        return this.state.results.map((result) => {
            return (<PreviousChat key={result.id} id={result.id} firstname={result.user2} message={result.message} created_at={result.created_at}/>);
        });
  },
   SearchConv:function(){

     let ThisUser = this.refs.SearchM.getValue();
     let ToSearch={
        user:ThisUser,
     }
     ThreadActions.getseachconv(ToSearch);
   },

     EnterKey(e){
        if (e.key ==='Enter') {

               {this.SearchConv()}
        }
     },

   SearchResult:function(){

     return this.state.results.map((result) => {
         return (<PreviousChat key={result.id} id={result.id} firstname={result.user2} message={result.message} created_at={result.created_at}/>);
     });

   },

  render: function() {
       return(
     <List subheader="Previous Chat" style={ListStyle} zDepth={1}>
     <IconButton iconClassName="muidocs-icon-custom-github" tooltip="top-right" tooltipPosition="top-right"/>
     <Divider inset={false} />
     <TextField hintText="Username" floatingLabelText="Search Conversation" style={searchconvo} ref="SearchM" onKeyPress={this.EnterKey} />
     <Divider inset={false} />
     <div>
      {this.previousMList()}
     </div>
     </List>
    );
  }
});

export default PreviousChatContainer;
