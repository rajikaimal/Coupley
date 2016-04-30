import React from 'react';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/lib/paper';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';

//tap-event-plugin

const styles = {
  root: {
    marginRight: '40',
  },
  gridList: {
    width: 500,
    height: 225,
  },
};

const linkStyle = {
  color: 'white',
};

const SearchItem = React.createClass({
  _redirect: function () {
    document.location = '/#/' + this.props.username;
  },

  render: function () {
    return (
      <div>
        <div className="col-lg-3" style={styles.root}>
          <GridList
            cellHeight={200}
            style={styles.gridList}
          >
            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                <GridTile
                key={this.props.firstname}
                title={<a id="username-a"
                style={linkStyle}>{this.props.firstname + ' ' + this.props.lastname}</a>}
                subtitle={this.props.gender}
                actionIcon={<IconButton></IconButton>}
              >
                <img src={'/img/profilepics/' + this.props.image} />
              </GridTile>
    
                                                                                                                                                                                                                                                                                                                                </GridList>
        </div>
      </div>
    );
  },
});

export default SearchItem;
