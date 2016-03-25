import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
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
  user1:LoginStore.getUsername(),
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
   
  

  handleOpen: function () {
    this.setState({ open: true });
  },

  handleClose: function () {
    this.setState({ open: false });
  },
  

  getInitialState: function () {
    return {
      results:ThreadStore.getpreviousmessage(initMessagges),
      statusText: '',
       value: 'a',
       open: false,
    };
  },

  componentDidMount: function () {
    ThreadStore.addChangeListener(this._onChange);
    ThreadActions.getpreviousmessage(initMessagges);
  },

  handleChange:function (event, index, value) {
    
    this.setState({
      value: event,
    });
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
      return (<PreviousChat key={result.id} id={result.thread_id} firstname={result.firstname} message={result.message} created_at={result.created_at}/>);
    });
  },

  SearchConv:function () {

    let ThisUser = this.refs.SearchM.getValue();

    let ToSearch = {
      user1:LoginStore.getUsername(),
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
      return (<PreviousChat key={result.id} id={result.id} firstname={result.firstname}  message={result.message} created_at={result.created_at}/>);
    });

  },

  render: function () {
  
  const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];


    return (



  <List  style={ListStyle} zDepth={1}>


    <Tabs>
      <Tab label="Conversations" >
      <div>
        <Divider inset={false} />
                         <TextField hintText="Username" floatingLabelText="Search Conversation" style={searchconvo}
                          ref="SearchM" errorText={this.state.statusText} onKeyPress={this.EnterKey} id="SearchField"/>
                         <Divider inset={false} />
                        <div>
                         {this.previousMList()}
                        </div>
       
      </div>
    </Tab>
        <Tab label="Message Request" >
      <div>
        <Divider inset={false} />
                         <TextField hintText="Username" floatingLabelText="Search Conversation" style={searchconvo} ref="SearchM" errorText={this.state.statusText} onKeyPress={this.EnterKey} id="SearchField"/>
                         <Divider inset={false} />
                        <div>
                        <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
                        </div>
       
      </div>
    </Tab>
    </Tabs>
   


       </List>

 );
  },
});

export default PreviousChatContainer;
