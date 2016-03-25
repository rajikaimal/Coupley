import React from 'react';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import TrendsStore from '../../stores/TrendsStore';
import TrendsAction from '../../actions/TrendsAction';
import Trend from './trendbox.react';

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

const TrendContainer = React.createClass({

       changeHandler: function(trend) {
        this.setState({
            value: trend,
            
        });
        console.log(trend);
    },
   
   getInitialState: function() {
    return {
      trendsResult:TrendsStore.gettrendslist(),
    }
  },

  componentDidMount: function() {
    TrendsStore.addChangeListener(this._onChange);
    TrendsAction.getTrendsList();
  },

  _onChange: function () {
    this.setState({trendsResult:TrendsStore.gettrendslist()});

  },
   
   trendItem: function () { 
    return this.state.trendsResult.map((result) => {
      return (<Trend trend={result.trend} id={result.id} onTouchTap={this.changeHandler}/>);     
    });
  },



	 render:function(){
	 	  return(
         <div style={style1}>
            <List >
            <div><h4>Trends</h4></div>
            <Divider/>
            <div>
            <TextField hintText="#Trends" floatingLabelText="Search Trends" style={searchconvo}
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