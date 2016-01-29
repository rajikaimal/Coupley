import React from 'react';
import SearchItem from './SearchItem.react';
import SearchStore from '../../stores/SearchStore';

const Search = React.createClass({
	getInitialState: function() {
		return {
			results: SearchStore.getresults()
		}
	},
	componentDidMount: function() {
		SearchStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			results: SearchStore.getresults()
		});
	},
	_renderSearchItem: function() {
		console.log(this.state.results);
		return this.state.results.map((result) => {
			return (<SearchItem key={result.id} username={result.username} firstname={result.firstname} lastname={result.lastname} gender={result.gender} />); 
		});
	},
	render: function() {
		return (
		  <div>
			{this._renderSearchItem()}
		  </div>
		);
	}
});

export default Search;
