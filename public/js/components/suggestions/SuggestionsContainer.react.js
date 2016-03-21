import React from 'react';
import Suggestion from './Suggestion.react';
import SuggestionStore from '../../stores/SuggestionStore';
import SuggestionActions from '../../actions/SuggestionActions';
import Paper from 'material-ui/lib/paper';
import Snackbar from 'material-ui/lib/snackbar';
import CardText from 'material-ui/lib/card/card-text';
import Card from 'material-ui/lib/card/card';

const style = {
	marginTop: 20
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
			results: SuggestionStore.getResults(),
			erropen: false,
			noresult: false
		}
	},
	componentDidMount: function() {
		SuggestionStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		if(SuggestionStore.getResults() === '' || SuggestionStore.getResults() == null) {
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
			results: SuggestionStore.getResults()
		});
		if(this.state.results == 'err') {
			this.setState({
				erropen: true
			});
		}
	},
	_renderSuggestion: function() {
		if(this.state.results) {
			return this.state.results.map((result) => {
				return (<Card><Suggestion key={result.id} username={result.username} firstname={result.firstname} lastname={result.lastname} gender={result.gender} image={result.profilepic} /> </Card>); 
			});
		}
	},
	_loadMore: function() {
		this.setState({
			results: SuggestionStore.getPaginationResults()
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
					{this._renderSuggestion()}
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