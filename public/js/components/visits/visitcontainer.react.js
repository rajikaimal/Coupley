import React from 'react';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Dialog from 'material-ui/lib/dialog';
import OtherV from './othersvisits.react';
import MyVisit from './myvisits.react';
import LoginStore from '../../stores/LoginStore';
import VisitsStore from '../../stores/VisitsStore';
import VisitsActions from '../../actions/VisitsAction';



var SearchCeck1 = true;
var SearchCeck2 = true;

const listStyle={
  height:500,
};

const tabstyle={
paddingLeft:50,
paddingRight:50,
paddingTop:50,

};



const searchconvo = {
  marginTop:10,
  paddingLeft:50,
  paddingRight:50,
  width:350,
};


const Thisuser = {
 myusername:LoginStore.getUsername(),
};

function validateStatusText1(textStatus) {

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

function validateStatusText2(textStatus) {

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


const VisitContainer = React.createClass({

  getInitialState: function() {
   return {
     VisitResult:VisitsStore.getMyVisitList(),
     OtherVisitResult:VisitsStore.getOthersVisitList(),
     statusText1: '',
     statusText2: '',
   }
 },

 componentDidMount: function() {
   VisitsStore.addChangeListener(this._onChange);
   VisitsActions.getMyvisits(Thisuser);
   VisitsActions.othersVisits(Thisuser);
  // VisitsAction.getTrendsInitialSearchPosts();
 },

 _onChange: function () {
   if (SearchCeck1) {
   this.setState({VisitResult:VisitsStore.getMyVisitList()});
   this.setState({OtherVisitResult:VisitsStore.getOthersVisitList()});
  } else if (!SearchCeck1) {
    this.setState({ VisitResult:VisitsStore.getMyVisitList()});
  }
  this.setState({OtherVisitResult:VisitsStore.getOthersVisitList()});
 },

 SearchMyVisits:function () {

   var uname=this.refs.SearchMV.getValue();

   let TheseUsers ={
     username:uname,
     myusername:LoginStore.getUsername(),
    }

   if (validateStatusText1(uname).error) {
     console.log('menna error');
     this.setState({
       statusText: validateStatusText1(uname).error,
     });
     val = false;
   } else {
     console.log('error na');
     VisitsActions.SearchMyvisits(TheseUsers);
     SearchCeck1 = false;
     this.setState({
       statusText: '',
     });
   }
     this.setState({VisitResult:VisitsStore.getMyVisitList()});
    console.log('search una');
     {this.clearText1();}

 },

 SearchOthersVisits:function () {

   var uname=this.refs.SearchOV.getValue();

   let TheseUsers ={
     username:uname,
     myusername:LoginStore.getUsername(),
    }

   if (validateStatusText2(uname).error) {
     console.log('menna error');
     this.setState({
       statusText2: validateStatusText2(uname).error,
     });
     val1 = false;
   } else {
     console.log('error na');
     VisitsActions.searchOthersVisits(TheseUsers);
     SearchCeck2 = false;
     this.setState({
       statusText2: '',
     });
   }

     this.setState({OtherVisitResult:VisitsStore.getOthersVisitList()});

     {this.clearText2();}

 },

 clearText1:function () {
   console.log('clear unaaaa');
   document.getElementById('SearchField1').value = '';
 },

 clearText2:function () {
   document.getElementById('SearchField2').value = '';
 },

 myVisits:function () {
   return this.state.VisitResult.map((result) => {
     return (<MyVisit fistname={result.firstname} username={result.username}/>);
   });
 },

 otherVisits:function () {
   return this.state.OtherVisitResult.map((results) => {
     return (<OtherV fistname={results.firstname} username={results.username}/>);
   });
 },


 EnterKey1(e) {
   if (e.key === 'Enter') {
     console.log('enter una');
     {this.SearchMyVisits();}
   }
 },

 EnterKey2(e) {
   if (e.key === 'Enter') {
     console.log('enter una');
     {this.SearchOthersVisits();}
   }
 },

      render:function(){

             return(
               <div>
                 <Tabs>
                  <Tab label="My Visits" >
                   <div>
                    <Paper style={listStyle} zDepth={0}>
                    <TextField hintText="Username" floatingLabelText="Search Users" style={searchconvo} errorText={this.state.statusText} onKeyPress={this.EnterKey1}
                     ref="SearchMV" id="SearchField1" />
                      <List subheader="" style={tabstyle}>
                     {this.myVisits()}
                      </List>
                    </Paper>
                   </div>
                  </Tab>
                  <Tab label="Visits to my profile" >
                   <div>
                   <Paper style={listStyle} zDepth={0}>
                   <TextField hintText="Username" floatingLabelText="Search Users" style={searchconvo} errorText={this.state.statusText} onKeyPress={this.EnterKey2}
                    ref="SearchOV" id="SearchField2"/>
                      <List style={tabstyle}>
                      {this.otherVisits()}
                      </List>
                    </Paper>
                   </div>
                  </Tab>
                 </Tabs>
               </div>

             );
      }

});

export default VisitContainer;
