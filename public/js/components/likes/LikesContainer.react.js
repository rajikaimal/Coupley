import React from 'react';
import Like from './Like.react';
import List from 'material-ui/lib/lists/list';
// import LikeAction from '../../actions/LikeActions';
// import LikeStore from '../../stores/LikeStore';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const LikesContainer = React.createClass({
  getIntitialState: function() {
    this.state = {
      value: 'a',
    };
  },
  componentDidMount:function() {
  
  },
  _onChange: function() {
  
  },

  handleChange: function(value) {
    this.setState({
      value: value,
    });
  },


  render: function() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Tab A" value="a" >
            <div>
              <h2 style={styles.headline}>Controllable Tab A</h2>
              <p>
                Tabs are also controllable if you want to programmatically pass them their values.
                This allows for more functionality in Tabs such as not
                having any Tab selected or assigning them different values.
              </p>
            </div>
          </Tab>
          <Tab label="Tab B" value="b">
            <div>
              <h2 style={styles.headline}>Controllable Tab B</h2>
              <p>
                This is another example of a controllable tab. Remember, if you
                use controllable Tabs, you need to give all of your tabs values or else
                you wont be able to select them.
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

export default LikesContainer;

