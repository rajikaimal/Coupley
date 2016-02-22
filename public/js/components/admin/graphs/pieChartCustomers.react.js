/**
 * Created by Isuru 1 on 20/02/2016.
 */
import React from 'react';
import { Link } from 'react-router';

const CustomerGraphs = React.createClass({
    preload: function () {
        document.getElementById('divLoading1').style.display = "none";
        document.getElementById('chartContainer').style.display = "block";
        document.getElementById('chartContainer1').style.display = "block";
    },
    render: function () {
        return (
            <div>
                <div id="divLoading1" style={ {
                    "position": "relative",
                    minHeight: "1px",
                    "paddingRight": "15px",
                    "paddingLeft": "550px"
                }}>
                    <img src="https://esdal.dft.gov.uk/Content/Images/Common/gallery-dark-loading.gif" alt="" />
                </div>
                <div  onLoad={this.preload} className="" id="chartContainer1" style={ {
                    "height": "300px",
                    "width": "100%",
                    "top": "-150px",
                    "position": "relative"
                }} >
                    <iframe className="pull-right" src="http://localhost:3000/cp-admin#/piegraph" style={{"border": "none"} } width="45%" height="133%" scrolling="no">
                    </iframe>
                </div>
            </div>
        );

    }
});

export default CustomerGraphs;