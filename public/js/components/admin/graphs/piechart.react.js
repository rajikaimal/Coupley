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
      var deactive = this.state.status[i].deactive; //Deactive key's value
      var active = this.state.status[i].active;     //Active key's value

    }

    active = parseInt(active);
    deactive = parseInt(deactive);

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
                      indexLabel: '#percent %',
                      showInLegend: true,
                      dataPoints: [
                          { y: active, name: 'Active Users', legendMarkerType: 'square' },
                          { y: deactive, name: 'Deactivated Users', legendMarkerType: 'square' },

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