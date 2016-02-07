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
        img: 'https://cdn4.iconfinder.com/data/icons/business-conceptual-part3/513/time-512.png',
        title: 'Timeline',
        path: '#/feedback/timeline'

    },
    {
        img: 'https://cdn0.iconfinder.com/data/icons/business-and-ecommerce/512/notepad_ok-512.png',
        title: 'ActivityFeed',
        path: '#/users/enemies'

    }
    ,
    {
        img: 'https://cdn4.iconfinder.com/data/icons/business-conceptual-part3/513/protection-512.png',
        title: 'Privacy',
        path: '#/users/enemies'

    }
    ,
    {
        img: 'https://cdn0.iconfinder.com/data/icons/social-icons-rounded/110/Chat-Notification-512.png',
        title: 'Chat',
        path: '#/users/enemies'

    }
    ,
    {
        img: 'https://cdn1.iconfinder.com/data/icons/random-flat-2/64/info_information_i_more-512.png',
        title: 'Other',
        path: '#/users/enemies'

    }

];
const style = {
    width: 200,
    height:50,
    fontSize: "20px",
    color:"white"

};

const tileElements = tilesData.map(tile => <GridTile
    key={tile.img}
    title={<FlatButton label={tile.title} secondary={true} style={style} linkButton={true} href={tile.path} />}

><img src={tile.img} /></GridTile>);
const gridListStyle = {width: 1000, height: 220, overflowY: 'auto'};

var Feedback = React.createClass({
    render: function () {
        return (
            <div>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {/* Basic grid list with mostly default options */}
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
    }

});

export default Feedback;