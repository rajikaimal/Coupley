import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';






const Trends = React.createClass({



    changeHandler: function(e) {

       this.props.abc(this.props.trends);

    },

	 render:function(){
	 	  return(
		 	  	<ListItem primaryText={this.props.trends} id={this.props.tid} onTouchTap={this.changeHandler}/>
	 	  	);
	 }
});

export default Trends;
