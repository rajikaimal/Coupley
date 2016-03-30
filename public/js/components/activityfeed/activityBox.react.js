import React from 'react';
import Card from 'material-ui/lib/card/card';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import ActivityfeedAction from '../../actions/ActivityFeed/ActivityfeedAction';
import LoginStore from '../../stores/LoginStore';
import StatusStore from '../../stores/StatusStore';

const style = {
  width: 800,
  marginLeft: 40,
  position:'relative',

};

const style1 = {
  width: 760,
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

const StatusBox = React.createClass({
  getInitialState: function () {
    return {
      statusText: ''
    }
  },

  addStatus:function(){
    let val = true;
    var status = this.refs.statusBox.getValue();
    
    let statusData = {
      email: LoginStore.getEmail(),
      userId: 11,
      firstName: LoginStore.getFirstname(),
      status: status,
    };
            
    if(validateStatusText(status).error) {
      this.setState({
        statusText: validateStatusText(status).error
      });
      val = false;
    } 
    else {
      ActivityfeedAction._addStatus(statusData);
      this.setState({
        statusText: ''
      });
    }
    this.clearText();
  },

  clearText:function() {
    document.getElementById('txtStatus').value = "";
  },

  /**
   * @return {object}
   */
  render: function () {
    return (
      <div>
        <Card style={style}>
          <Paper zDepth={1}>
            <div className='col-md-10'></div>
              <TextField style={style1} className='col-md-2' fullWidth={true} hintText="What's new with you? " multiLine={true} errorText={this.state.statusText} ref="statusBox" id="txtStatus" />
              <FlatButton className='col-md-1' label="Photos" />
              <div className='col-md-9'></div>
              <FlatButton className='col-md-1' label="Post"  rippleColor='#2196F3' onClick={this.addStatus}/>
          </Paper>
        </Card>
      </div>
    );
  }
});

export default StatusBox;