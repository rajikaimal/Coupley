/**
 * Created by Isuru 1 on 22/02/2016.
 */

import React from 'react';
import { Link } from 'react-router';
import GraphActions from './../../../actions/admin/GraphActions';
import GraphStore from './../../../stores/admin/GraphStore';

const pieChart = React.createClass({
  getInitialState: function () {
    return {
      status: GraphStore.getresults(),
    };
  },

  componentDidMount: function () {
    GraphActions.userStatus();
    GraphStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    if (this.isMounted()) {
      this.setState({
        status: GraphStore.getresults(),
      });
    }
  },

  graph: function () {
    for (var i in this.state.status) {
      var Deactive = this.state.status[i].deactive; //Deactive key's value
      var Active = this.state.status[i].active;     //Active key's value

    }

    var chart = new CanvasJS.Chart('chartContainer1',
            {
              title: {
                text: 'Users all the time',
                fontFamily: 'arial black',
              },
              animationEnabled: true,
              legend: {
                verticalAlign: 'bottom',
                horizontalAlign: 'center',
              },
              theme: 'theme1',
              data: [
                    {
                      type: 'pie',
                      indexLabelFontFamily: 'Garamond',
                      indexLabelFontSize: 20,
                      indexLabelFontWeight: 'bold',
                      startAngle: 0,
                      indexLabelFontColor: 'MistyRose',
                      indexLabelLineColor: 'darkgrey',
                      indexLabelPlacement: 'inside',
                      toolTipContent: '{y} {name}',
                      showInLegend: true,
                      indexLabel: '{name}',
                      dataPoints: [
                          { y: Active, name: 'Active Users', legendMarkerType: 'square' },
                          { y: Deactive, name: 'Deactivated Users', legendMarkerType: 'square' },

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

export default pieChart;
