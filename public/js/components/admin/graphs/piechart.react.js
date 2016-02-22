/**
 * Created by Isuru 1 on 22/02/2016.
 */

import React from 'react';
import { Link } from 'react-router';


const Cards = React.createClass({
    graph: function () {
        var chart = new CanvasJS.Chart("chartContainer1",
            {
                title: {
                    text: "Users all the time",
                    fontFamily: "arial black"
                },
                animationEnabled: true,
                legend: {
                    verticalAlign: "bottom",
                    horizontalAlign: "center"
                },
                theme: "theme1",
                data: [
                    {
                        type: "pie",
                        indexLabelFontFamily: "Garamond",
                        indexLabelFontSize: 20,
                        indexLabelFontWeight: "bold",
                        startAngle: 0,
                        indexLabelFontColor: "MistyRose",
                        indexLabelLineColor: "darkgrey",
                        indexLabelPlacement: "inside",
                        toolTipContent: "{name}: {y}",
                        showInLegend: true,
                        indexLabel: "#percent%",
                        dataPoints: [
                            {y: 52, name: "Blocked Users", legendMarkerType: "triangle"},
                            {y: 100, name: "Usual Users", legendMarkerType: "square"}

                        ]
                    }
                ]
            });
        chart.render();
    },
    render: function () {
        return (
            <div>
                <div onLoad={this.graph(this)}></div>
            </div>

        );
    }
});

export default Cards;
