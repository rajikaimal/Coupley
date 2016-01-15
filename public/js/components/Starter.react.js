var React = require('react');
var StarterActions = require('../actions/StarterActions');
var TodoStore = require('../stores/TodoStore');
var TodoInput = require('./TodoInput');
var Name = require('./Name.react');

function getAll() {
	return {
		alltodos: TodoStore.getAll()
	}
}

var Starter = React.createClass({
	getInitialState: function() {
		return getAll();
	},

	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
	},

	_handleClick: function() {
		StarterActions.create('Alo alo from component');
	},
	_onChange: function() {
		this.setState(getAll());
		console.log('State');
		console.log(this.state.alltodos[0].action.item);
	},
	render: function() {
		return (
			<div>
				<h2 onClick={this._handleClick}>Click me </h2>
				<h3>{this.state.alltodos}</h3>
				<TodoInput />
			</div>
		);
	}
});

module.exports = Starter;