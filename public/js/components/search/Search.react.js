import React from 'react';
import SearchItem from './SearchItem.react';
import SearchStore from '../../stores/SearchStore';
import Paper from 'material-ui/lib/paper';
import Snackbar from 'material-ui/lib/snackbar';

const style = {
	marginLeft: "40"
}

const Search = React.createClass({
	getInitialState: function() {
		return {
			results: SearchStore.getresults(),
			erropen: false
		}
	},
	componentDidMount: function() {
		SearchStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			results: SearchStore.getresults()
		});
		if(this.state.results == 'err') {
			this.setState({
				erropen: true
			});
		}
	},
	_renderSearchItem: function() {
		console.log(this.state.results);
		if(this.state.results == '') {
			//alert('Null');
		} ///else if (this.state.results == 'err') {
		// 	this.setState({
		// 		erropen: true
		// 	});
		// }
		return this.state.results.map((result) => {
			return (<SearchItem key={result.id} username={result.username} firstname={result.firstname} lastname={result.lastname} gender={result.gender} />); 
		});
	},
	render: function() {
		return (
		  <div style={style}>
		  	<Paper zDepth={2}>
				{this._renderSearchItem()}
			</Paper>
			{this.state.erropen ? <Snackbar
                    open={this.state.erropen}
                    message="Error occured please try again later"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                /> : ''}
		  </div>
		);
	}
});

export default Search;
