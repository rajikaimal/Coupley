/**
 * Created by Isuru 1 on 25/01/2016.
 */
import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FlatButton from 'material-ui/lib/flat-button';

//import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import Divider from 'material-ui/lib/divider';
import PathStore from './../../../stores/admin/PathStore';
const tilesData = [
  {
    img: '../../../../img/User_group_man_people_users_male.png',
    title: 'Reported Users',
    path: '#/users/friends',

  },
  {
    img: '../../../../img/lock_user_man_secure-256.png',
    title: 'Blocked Users',
    path: '#/users/enemies',

  },

];
const style = {
  width: 300,
  height: 50,
  fontSize: '20px',
  color: 'white',

};

const tileElements = tilesData.map(tile => <GridTile
    key={tile.img}
    title={<FlatButton label={tile.title} secondary={true} style={style}
    linkButton={true} href={tile.path} />}

><img src={tile.img}/></GridTile>);
const gridListStyle = { width: 600, height: 220, overflowY: 'auto' };

var GridListExampleSimple = React.createClass({
  getInitialState: function () {
    return PathStore.getpath();
  },

  componentDidMount: function () {
    PathStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(
      PathStore.getpath()
    );
  },

  render: function () {
    return (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <GridList
                cellHeight={200}
                style={gridListStyle}
            >
              {tileElements}
            </GridList>
          </div>
          <Divider/>
          <section class="col-lg-5">

            {this.props.children}

          </section>

        </div>
    );
  },

});

export default GridListExampleSimple;
