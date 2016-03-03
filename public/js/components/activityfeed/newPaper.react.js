import React from 'react';
import Card from 'material-ui/lib/card/card';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import ActivityfeedAction from '../../actions/ActivityFeed/ActivityfeedAction';
import LoginStore from '../../stores/LoginStore';

const style = {
  width: 800,
  marginLeft: 40,
  position:'relative',

};

function validateStatusText(textStatus) {

        if(textStatus.length > 250) {
          return {
            "error": "*status is too long"
          }
        }
        else if(textStatus === "") {
          return {
            "error": "*status cannot be empty"
          }
        }
        else {
          return true;
        }
};

const PaperExampleSimple = React.createClass({

    getInitialState: function () {
        return {
            statusText: ''
        }
    },

    addStatus:function(){
            let val = true;
            var email = LoginStore.getEmail();
            var firstname = LoginStore.getFirstname();
            var status = this.refs.statusBox.getValue();

                let add_status = {
                Status: status,
                Email: email,
                Fname: firstname
            };
            ActivityfeedAction.add_status(add_status);
            
      if(validateStatusText(status).error) {
        this.setState({
          statusText: validateStatusText(status).error
        });
        val = false;
      }

      this.clearText();
    },

    clearText:function() {
        document.getElementById('txtStatus').value = "";
    },

    render: function () {
        return (
           <div>
             <Card style={style}>
              <Paper zDepth={1}>
              <div className='col=md-10'></div>
              <TextField fullWidth={true} hintText="What's new with you? " multiLine={true} errorText={this.state.statusText} ref="statusBox" id="txtStatus" />
              <FlatButton className='col-md-3' label="Add Files" />
              <FlatButton className='col-md-3' label="Add Photos" />
              <div className='col-md-4'>
              </div><FlatButton className='col-md-1' label="Post"  rippleColor='#2196F3' onClick={this.addStatus}/>
              </Paper>
              </Card>
           </div>
        );
    }
});

export default PaperExampleSimple;
