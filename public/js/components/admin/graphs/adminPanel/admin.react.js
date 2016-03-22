import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/lib/paper';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Toggle from 'material-ui/lib/toggle';

//tap-event-plugin
injectTapEventPlugin();
const path = '../../../../../../img/profilepics/';

const styles = {
  root: {
    marginLeft: '1',
  },
  gridList: {
    width: 500,
    height: 225,
  },
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
};
const linkStyle = {
  color: 'white',
};
const green = {
  color: 'lightgreen',
};
const red = {
  color: 'red',
};
const Admin = React.createClass({
  statusCheck: function () {
    if (this.props.status == 'active') {
      return true;
    } else {
      return false;
    }
  },

  styleCheck: function () {
    if (this.props.status == 'active') {
      return green;
    } else {
      return red;
    }
  },

  render: function () {
    return (
        <div>
          <div className="col-lg-4">
            <GridList
                cellHeight={200}
                style={styles.gridList}
            >

              <GridTile
                  key={this.props.name}
                  title={<a id="username-a"
                  style={linkStyle}>{this.props.name}</a>}
                  subtitle={this.props.job}
                  actionIcon={<Toggle
                                label={<a style={this.styleCheck()}> {this.props.status}</a>}
                                toggled={this.statusCheck()}
                                disabled={true}
                                style={styles.toggle}
                              />}
              >
                <img src={path + this.props.profilepic} />
              </GridTile>
            </GridList>
          </div>
        </div>
    );
  },
});

export default Admin;
