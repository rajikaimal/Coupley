var React = require('react');
var StarterActions = require('../actions/StarterActions');
var NewStore = require('../stores/NewStore');

function getAll() {
	return {
		todos: NewStore.getAll()
	}
}

var TodoInput = React.createClass({
	getInitialState: function() {
		return getAll();
	},

	componentDidMount: function() {
		NewStore.addChangeListener(this._onChange);
	},

	_onKeyDown: function() {
		
	},

	_onChange: function() {
		this.setState(getAll());
		console.log('State');
		console.log(this.state.todos[0].action.item);
	},

	_handleChange: function(event) {
		var value = event.target.value;
		StarterActions.create(value);
		console.log(event.target.value);
	},

	render: function() {
		return (
			<div>
				<input type="text" ref="todovalue" onChange={this._handleChange} />
			</div>
		);
	}
});

module.exports = TodoInput;