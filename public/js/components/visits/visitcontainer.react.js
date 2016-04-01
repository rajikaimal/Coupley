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


const VisitContainer = React.createClass({

  getInitialState: function() {
   return {
     VisitResult:VisitsStore.getMyVisitList(),
     OtherVisitResult:VisitsStore.getOthersVisitList(),
     statusText: '',
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

   var uname=this.refs.SearchT.getValue();

   let TheseUsers ={
     username:uname,
     myusername:LoginStore.getUsername(),
    }
    console.log(ThisTrend.trend);

   if (validateStatusText(ThisTrend).error) {
     console.log('menna error');
     this.setState({
       statusText: validateStatusText(ThisTrend).error,
     });
     val = false;
   } else {
     console.log('error na');
     VisitsActions.SearchMyvisits(TheseUsers);
     SearchCeck = false;
     this.setState({
       statusText: '',
     });
   }
     {this.trendSearchItem();}

     {this.clearText();}

 },

 clearText:function () {
   document.getElementById('SearchField').value = '';
 },


 myVisits:function () {
   return this.state.VisitResult.map((result) => {

     return (<MyVisit fistname={result.firstname}/>);
   });
 },

 otherVisits:function () {
   return this.state.OtherVisitResult.map((results) => {
     return (<OtherV fistname={results.firstname}/>);
   });
 },

 EnterKey1(e) {
   if (e.key === 'Enter') {
     console.log('enter una');
     {this.SearchMyVisits();}
   }
 },

      render:function(){
             return(
               <div>
                 <Tabs>
                  <Tab label="My Visits" >
                   <div>
                    <Paper style={listStyle} zDepth={0}>
                      <List subheader="Recent chats">
                     {this.myVisits()}
                      </List>
                    </Paper>
                   </div>
                  </Tab>
                  <Tab label="Visits to my profile" >
                   <div>
                    <Paper style={listStyle} zDepth={0}>
                      <List>
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
