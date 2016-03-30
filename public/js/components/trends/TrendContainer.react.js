import React from 'react';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import TrendsStore from '../../stores/TrendsStore';
import TrendsAction from '../../actions/TrendsAction';
import Trend from './trendbox.react';
import TrendPost from './trendactivityListComp.react';

var SearchCeck = true;
var listClick = true;

const style1={
  width:200,
  height:300,
};
const searchconvo = {
  marginTop:'-18',
  paddingLeft:10,
  paddingRight:50,
  width:150,
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

   getInitialState: function() {
    return {
      trendsResult:TrendsStore.gettrendslist(),
      statusText: '',
      value:'',
      trendsPostResult:TrendsStore.getFirstTrendsSearchPost(),
    }
  },

  componentDidMount: function() {
    TrendsStore.addChangeListener(this._onChange);
    TrendsAction.getTrendsList();
    TrendsAction.getTrendsInitialSearchPosts();
  },

  _onChange: function () {
    if (SearchCeck) {
    this.setState({trendsResult:TrendsStore.gettrendslist()});
    } else if (!SearchCeck) {
     this.setState({ trendsResult:TrendsStore.getTrendsSearchList()});
   }
   if(listClick){
   this.setState({ trendsPostResult:TrendsStore. getFirstTrendsSearchPost()});
   }else if (!listClick) {
    this.setState({ trendsPostResult:TrendsStore. getTrendsSearchPost()});
  }
  },

   trendItem: function () {
    return this.state.trendsResult.map((result) => {
      return (<Trend abc={this.getHashtag} trends={result.trend} tid={result.id}/>);
    });

  },

  SearchTren:function () {

    var trd=this.refs.SearchT.getValue();

    let ThisTrend ={
      trend:trd,
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
      TrendsAction.getTrendsSearchList(ThisTrend);
      SearchCeck = false;
      this.setState({
        statusText: '',
      });
    }
      {this.trendSearchItem();}

      {this.clearText();}

  },

  getHashtag:function (e) {
    console.log('clicked');
    console.log(e);
    let trend={
      strend:e,
    };
    TrendsAction.getTrendsSearchPosts(trend);


  },

  trendSearchItem: function () {
   this.setState({ trendsResult:TrendsStore.getTrendsSearchList()});
   console.log('menna result');
   console.log(this.state.trendsResult);
   return this.state.trendsResult.map((result) => {
     return (<Trend trends={result.trend} tid={result.id}/>);
   });
 },

  //
  //  trendPostSelectedItem: function () {
  //    this.setState({ trendsPostResult:TrendsStore.getTrendsSearchPost()});
  //   return this.state.trendsPostResult.map((result) => {
  //     return (<TrendPost />);
  //   });
  //
  // },

  trendPostItem: function () {
   return this.state.trendsPostResult.map((result) => {
     return (<TrendPost/>);
   });

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
        <div>
         <div style={style1} className="col-xs-4">
            <List zDepth={1}>
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

        <div className="col-xs-8">
                {this.trendPostItem()}
        </div>

      </div>

	 	  	);
	 }
});

export default TrendContainer;
