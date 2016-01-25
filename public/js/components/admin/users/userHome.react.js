/**
 * Created by Isuru 1 on 25/01/2016.
 */
import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FlatButton from 'material-ui/lib/flat-button';
//import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

const tilesData = [
    {
        img: 'https://cdn2.iconfinder.com/data/icons/metallic-people/512/people_group_users_friends-512.png',
        title: 'Friends'

    },
    {
        img: 'https://cdn1.iconfinder.com/data/icons/rcons-user-action/512/block_users_group-512.png',
        title: 'Enemies'

    }

];
const style = {
    width: 300,
    height:50,
    "text-align":"center",
    "font-size":"20px",
"font-weight":3000,
"line-height":14

};

const tileElements = tilesData.map(tile => <GridTile
    key={tile.img}
    title={<FlatButton label={tile.title} secondary={true} style={style} />}

><img src={tile.img} /></GridTile>);
const gridListStyle = {width: 600, height: 500, overflowY: 'auto', marginBottom: 24};

const GridListExampleSimple = () => (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
    {/* Basic grid list with mostly default options */}
        <GridList
            cellHeight={200}
            style={gridListStyle}
        >
      {tileElements}
        </GridList>
    </div>
);

export default GridListExampleSimple;