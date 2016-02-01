import React from 'react';
import List from 'material-ui/lib/lists/list';
import Question from './Question.react';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';

const question = [
	"Would you go for a movie on saturday night ?",
	"Would you go for a movie on saturday night ?",
	"Would you go for a movie on saturday night ?",
	"Would you go for a movie on saturday night ?",
	"Would you go for a movie on saturday night ?"
];

const style = {
	"size": "20"
};

const Quiz = React.createClass({
  _renderquestion: function() {
  	return question.map((question) => {
  		return (<Question question={question} />);
  	});
  },
  render: function() {
    return (
      <div className="container-fluid">
      	<div className="row">
      		<div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
				<List subheaderStyle={style} subheader="Let's get cheesy, let us know about yourself, we'll do the rest for you ;)">
					{this._renderquestion()}
				</List>
				<Paper zDepth={1}>
					<FlatButton label="Done !" primary={true} />
				</Paper>
			</div>
		</div>         
      </div>
    );    
  }

});

export default Quiz;