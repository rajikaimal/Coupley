import React from 'react';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import TrendsStore from '../../stores/TrendsStore';
import TrendsAction from '../../actions/TrendsAction';
import Trend from './trendbox.react';

var SearchCeck = true;

const style1={
  width:200,
  height:300,
};
const searchconvo = {
  marginTop:'-18',
  paddingLeft:10,
  paddingRight:10,
  width:180,
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

const TrendContainer = React.createClass({

   changeHandler: function(trends) {
        this.setState({
            value:trends,
           });
        console.log(this.state.value);
    },

   getInitialState: function() {
    return {
      trendsResult:TrendsStore.gettrendslist(),
      statusText: '',
      value:'',
    }
  },

  componentDidMount: function() {
    TrendsStore.addChangeListener(this._onChange);
    TrendsAction.getTrendsList();
  },

  _onChange: function () {
    if (SearchCeck) {
    this.setState({trendsResult:TrendsStore.gettrendslist()});
    } else if (!SearchCeck) {
     this.setState({ trendsResult:TrendsStore.getTrendsSearchList()});
   }
  },

   trendItem: function () {
    return this.state.trendsResult.map((result) => {
      return (<Trend trends={result.trend} tid={result.id} onTouchTap={this.changeHandler}/>);
    });

  },

  trendSearchItem: function () {
   this.setState({ trendsResult:TrendsStore.getTrendsSearchList()});
   return this.state.trendsResult.map((result) => {
     return (<Trend trends={result.trend} tid={result.id} onTouchTap={this.changeHandler}/>);
   });
 },

  SearchTren:function () {

    let ThisTrend = this.refs.SearchT.getValue();
  console.log(ThisTrend);

    if (validateStatusText(ThisTrend).error) {
      console.log('menna error');
      this.setState({
        statusText: validateStatusText(ThisTrend).error,
      });
      val = false;
    } else {
      console.log('error na');
      TrendsAction.getTrendsSearchList(ThisTrend);
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


    EnterKey(e) {
      if (e.key === 'Enter') {
        console.log('enter una');
        {this.SearchTren();}
      }
    },



	 render:function(){
	 	  return(
         <div style={style1}>
            <List >
            <div><h4>Trends</h4></div>
            <Divider/>
            <div>
            <TextField hintText="#Trends" floatingLabelText="Search Trends" style={searchconvo} errorText={this.state.statusText} onKeyPress={this.EnterKey}
             ref="SearchT" id="SearchField"/>
            </div>
            <Divider/>
             {this.trendItem()}
           </List>

          </div>

	 	  	);
	 }
});

export default TrendContainer;
