import React from 'react';
import List from 'material-ui/lib/lists/list';
import Question from './Question.react';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import QuestionBank from './QuestionBank';

const question = QuestionBank.StraightQuestions;

const style = {
	"size": "20"
};

const Quiz = React.createClass({
  componentDidMount: function() {
  
  },
  _renderquestion: function() {
  	return question.map((question) => {
  		return (<Question id={question.id} question={question.question} />);
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
					<RaisedButton label="Done !" secondary={true} style={style} />
				</Paper>
			</div>
		</div>         
      </div>
    );    
  }

});

export default Quiz;