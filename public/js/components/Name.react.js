var React = require('react');
var NameActions = require('../actions/NameActions');
var NameStore = require('../stores/NameStore');

var Name = React.createClass({
	render: function() {
		return (
			<div>
				<input type="text" 
					value="enter something" ref="newinputvalue" />
			</div>
		);
	}
});

exports.module = Name;