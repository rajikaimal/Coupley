/**
 * Created by Isuru 1 on 07/02/2016.
 */
import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FlatButton from 'material-ui/lib/flat-button';

//import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import Divider from 'material-ui/lib/divider';

const tilesData = [
    {
      img: '../../../../img/time-512.png',
      title: 'Timeline',
      path: '#/feedback/timeline',

    },
    {
      img: '../../../../img/notepad_ok-512.png',
      title: 'ActivityFeed',
      path: '#/feedback/activity',

    },
    {
      img: '../../../../img/protection-512.png',
      title: 'Privacy',
      path: '#/feedback/privacy',

    },
    {
      img: '../../../../img/Chat-Notification-512.png',
      title: 'Chat',
      path: '#/feedback/chat',

    },
    {
      img: '../../../../img/info_information_i_more-512.png',
      title: 'Other',
      path: '#/feedback/others',

    },

];
const style = {
  width: 200,
  height:50,
  fontSize: '20px',
  color:'white',

};

const tileElements = tilesData.map(tile => <GridTile
    key={tile.img}
    title={<FlatButton label={tile.title} secondary={true} style={style} linkButton={true} href={tile.path} />}

><img src={tile.img} /></GridTile>);
const gridListStyle = { width: 1000, height: 220, overflowY: 'auto' };

var Feedback = React.createClass({
  render: function () {
    return (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <GridList
                    cols={5}
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

export default Feedback;
