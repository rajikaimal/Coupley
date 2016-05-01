import React from 'react';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Paper from 'material-ui/lib/paper';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';

const styles = {
  root: {
    marginRight: "40"
  },
  gridList: {
    width: 500,
    height: 225,
  },
};

const Photo = React.createClass({
  render: function() {
    return (
      <div>
        <div className="col-lg-3" style={styles.root}>
          <GridList
            cellHeight={200}
            style={styles.gridList}
          >
            
              <GridTile
                key={this.props.path}
              >
                <img src={'img/activityFeedPics/' + this.props.path} />
              </GridTile>
    
          </GridList>
        </div>
      </div>
    );
  }
});

export default Photo;
