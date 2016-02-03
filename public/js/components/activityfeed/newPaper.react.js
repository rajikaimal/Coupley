import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import ActivityFeedActions from '../../actions/ActivityFeed/ActivityFeedActions';
import LoginStore from '../../stores/LoginStore';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const style_button = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const PaperExampleSimple = React.createClass({

  EnterKey(e){
      if (e.key ==='Enter') {
              console.log();
              console.log(this.refs.statusBox.getValue());
              var status = this.refs.statusBox.getValue();
              var email= LoginStore.getEmail();   
              let add_status={
                 Status: status,
                 Email: email
              };
              ActivityFeedActions.add_status(add_status);

              /*onsole.log(LoginStore.getEmail());
              var email= LoginStore.getEmail();  
              let add_useremail={
                 Email: email
              };
              ActivityFeedActions.add_useremail(add_useremail);*/
             }
   },

   render:function(){
       return (
         <div>
          <Paper zDepth={1}>
            <TextField hintText="What's new with you? " multiLine={false} fullWidth={true} onKeyPress={this.EnterKey} ref="statusBox" />
          </Paper>
         </div>
       );
   }
});
  
export default PaperExampleSimple;
