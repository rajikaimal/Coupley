import React from 'react';
import SearchItem from './SearchItem.react';
import SearchStore from '../../stores/SearchStore';
import Paper from 'material-ui/lib/paper';
import Snackbar from 'material-ui/lib/snackbar';

const style = {
	marginLeft: "40"
}

const loadMoreStyle = {
	marginTop: 500,
	position: 'fixed'
}

const noresultStyle = {
	fontSize: 20,
	fontWeight: 'bold'
}

const Search = React.createClass({
	getInitialState: function() {
		return {
			results: SearchStore.getresults(),
			erropen: false,
			noresult: false
		}
	},
	componentDidMount: function() {
		SearchStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		if(SearchStore.getresults() === '' || SearchStore.getresults() == null) {
			this.setState({
				resuls: '',
				noresult: true
			});
		} else {
			this.setState({
				noresult: false
			});
		}
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
		if(this.state.results) {
			return this.state.results.map((result) => {
				return (<SearchItem key={result.id} username={result.username} firstname={result.firstname} lastname={result.lastname} gender={result.gender} image={result.profilepic} />); 
			});
		}
	},
	_loadMore: function() {
		this.setState({
			results: SearchStore.getPaginationResults()
		});
	},
	render: function() {
		return (
		  <div style={style}>
		  	{
				this.state.noresult ? <label style={noresultStyle}> No results found ! </label>
					: ''
			}
		  	<Paper zDepth={2}>
				{this._renderSearchItem()}
			</Paper>
			{this.state.results ? <button style={loadMoreStyle} onClick={this._loadMore}> Load more </button>  : ''}
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