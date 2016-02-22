/**
 * Created by Isuru 1 on 20/02/2016.
 */
import React from 'react';
import { Link } from 'react-router';

const CustomerGraphs = React.createClass({
    preload: function () {

        document.getElementById('chartContainer').style.display = "block";
    },
    render: function () {
        return (
            <div>
                <div  id="chartContainer" style={ {"height": "300px", "width": "100%"}} >
                    <iframe src="http://localhost:3000/cp-admin#/graph" style={{"border": "none"} } width="45%" height="135%" scrolling="no"></iframe>
                </div>
            </div>
        );

    }
});

export default CustomerGraphs;