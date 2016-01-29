import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button'

const style = {
  margin:12,
};

const PaperExampleSimple = () => (
  <div>
    <Paper zDepth={1}>
     <TextField hintText="Message" multiLine={false} fullWidth={true}/>
    </Paper>
  </div>
);

export default PaperExampleSimple;
