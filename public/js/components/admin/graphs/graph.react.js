/**
 * Created by Isuru 1 on 21/02/2016.
 */
import React from 'react';
import { Link } from 'react-router';

const Cards = React.createClass({
  graph: function () {
    var chart = new CanvasJS.Chart('chartContainer',
            {
              theme: 'theme2',
              title: {
                text: 'Customer Registrations - All the time',
              },
              animationEnabled: true,
              axisX: {
                valueFormatString: 'MMM',
                interval: 1,
                intervalType: 'month',

              },
              axisY: {
                includeZero: false,

              },
              data: [
                    {
                      type: 'line',
                      dataPoints: [
                          { x: new Date(2012, 0, 1), y: 450 },
                          { x: new Date(2012, 1, 1), y: 414 },
                            {
                              x: new Date(2012, 2, 1),
                              y: 520,
                              indexLabel: 'highest',
                              markerColor: 'red',
                              markerType: 'triangle',
                            },
                            { x: new Date(2012, 3, 1), y: 460 },
                            { x: new Date(2012, 4, 1), y: 450 },
                            { x: new Date(2012, 5, 1), y: 500 },
                            { x: new Date(2012, 6, 1), y: 480 },
                            { x: new Date(2012, 7, 1), y: 480 },
                            {
                              x: new Date(2012, 8, 1),
                              y: 410,
                              indexLabel: 'lowest',
                              markerColor: 'DarkSlateGrey',
                              markerType: 'cross',
                            },
                            { x: new Date(2012, 9, 1), y: 500 },
                            { x: new Date(2012, 10, 1), y: 480 },
                            { x: new Date(2012, 11, 1), y: 510 },

                        ],
                    },

                ],
            });
    chart.render();
  },

  render: function () {
    return (
        <div>
                            <div onLoad={this.graph(this)}></div>
                    </div>

    );
  },
});

export default Cards;
