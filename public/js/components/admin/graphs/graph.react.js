/**
 * Created by Isuru 1 on 21/02/2016
 */
import React from 'react';
import { Link } from 'react-router';
import GraphActions from './../../../actions/admin/GraphActions';
import GraphStore from './../../../stores/admin/GraphStore';

const LineGraph = React.createClass({

  getInitialState: function () {
      return {
        users: GraphStore.getresults(),
      };
    },

  componentDidMount: function () {
      GraphActions.userRegistrations();
      GraphStore.addChangeListener(this._onChange);
    },

  _onChange: function () {
      if (this.isMounted()) {
        this.setState({
          users: GraphStore.getresults(),
        });
      }
    },

  graph: function () {

    var dataPoints = [];
    var i;
    for (i in this.state.users) {
      var count = this.state.users[i].sum;
      var dateTime = this.state.users[i].createdAt;
      var date = (dateTime.split(' ')[0]);
      var y = date.split('-')[0];
      var m = date.split('-')[1];
      var d = date.split('-')[2];
      dataPoints.push({ x: new Date(y, m, d), y:parseInt(count) });
    }

    var chart = new CanvasJS.Chart('chartContainer',
          {
            theme: 'theme2',
            title: {
              text: 'User Registrations - All the time',
            },
            animationEnabled: true,
            axisX: {
              valueFormatString: 'DD-MMM-YYYY',
              interval: 1,
              intervalType: 'month',
              title:'Date',
            },
            axisY: {
              includeZero: false,
              title:'Total Users',
            },
            data: [
              {
                type: 'line',
                dataPoints: dataPoints,
              },
            ],
          });

    chart.render();
  },

  render: function () {
    return (
        <div>
          <div onLoad={this.graph()}></div>
        </div>

    );
  },
});

export default LineGraph;