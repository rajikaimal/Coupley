import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import PreviousChat from './ChatPrevious.react';
import ThreadActions from '../../actions/Thread/ThreadActions';
import ThreadStore from '../../stores/ThreadStore';
import LoginStore from '../../stores/LoginStore';

var SearchCeck = true;

const ListStyle = {
  width: 300,
  height:635,
};

const searchconvo = {
  marginTop:'-18',
  paddingLeft:20,
};

const initMessagges = {
  user1:LoginStore.getFirstname(),
};

function validateStatusText(textStatus) {

  if (textStatus.length > 250) {
    return {
            error: '*search is too long',
          };
  }  else if (textStatus.length == 0) {
    console.log('empty');
    return {
            error: '*search cannot be empty',
          };
  }  else {
    return true;
  }
};

const PreviousChatContainer = React.createClass({

  getInitialState: function () {
    return {
      results:ThreadStore.getpreviousmessage(initMessagges),
      statusText: '',
    };
  },

  componentDidMount: function () {
    ThreadStore.addChangeListener(this._onChange);
    ThreadActions.getpreviousmessage(initMessagges);
  },

  _onChange: function () {
    if (SearchCeck) {
      this.setState({ results:ThreadStore.getpreviousmessage(initMessagges) });
    } else if (!SearchCeck) {
      this.setState({ results:ThreadStore.getsearchconv() });
    }
  },

  previousMList: function () {
    return this.state.results.map((result) => {
      return (<PreviousChat key={result.id} id={result.id} firstname={result.user2} message={result.message} created_at={result.created_at}/>);
    });
  },

  SearchConv:function () {

    let ThisUser = this.refs.SearchM.getValue();

    let ToSearch = {
      user1:LoginStore.getFirstname(),
      user2:ThisUser,
    };

    if (validateStatusText(ThisUser).error) {
      console.log('menna error');
      this.setState({
        statusText: validateStatusText(ThisUser).error,
      });
      val = false;
    } else {
      console.log('error na');
      ThreadActions.getseachconv(ToSearch);
      SearchCeck = false;
      this.setState({
        statusText: '',
      });
    }

    {this.SearchResult();}

    {this.clearText();}

  },

  clearText:function () {
    document.getElementById('SearchField').value = '';
  },

  EnterKey(e) {
    if (e.key === 'Enter') {
      console.log('enter una');
      {this.SearchConv();}
    }
  },

  SearchResult:function () {

    this.setState({ results:ThreadStore.getsearchconv() });
    return this.state.results.map((result) => {
      return (<PreviousChat key={result.id} id={result.id} firstname={result.user2} message={result.message} created_at={result.created_at}/>);
    });

  },

  render: function () {
    return (
  <List subheader="Previous Chat" style={ListStyle} zDepth={1}>
       <IconButton iconClassName="muidocs-icon-custom-github" tooltip="top-right" tooltipPosition="top-right"/>
       <Divider inset={false} />
       <TextField hintText="Username" floatingLabelText="Search Conversation" style={searchconvo} ref="SearchM" errorText={this.state.statusText} onKeyPress={this.EnterKey} id="SearchField"/>
       <Divider inset={false} />
       <div>
         {this.previousMList()}
       </div>
       </List>
 );
  },
});

export default PreviousChatContainer;
