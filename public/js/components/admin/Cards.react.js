/**
 * Created by Isuru 1 on 21/01/2016.
 */
import React from 'react';
import { Link } from 'react-router';
import Tabs from './graphs/tab.react';
import CustomerGraph from './graphs/customers.react';
import PieGraph from './graphs/pieChartCustomers.react';
import GraphActions from './../../actions/admin/GraphActions';
import GraphStore from './../../stores/admin/GraphStore';

const Cards = React.createClass({
  getInitialState: function () {
    return {
      status: GraphStore.getresults(),
    };
  },

  componentDidMount: function () {
    GraphActions.userStats();
    GraphStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    if (this.isMounted()) {
      this.setState({
        status: GraphStore.getresults(),
      });
    }
  },

  retireveLikebacks:function () {
    for (var i in this.state.status) {
      var flirts = this.state.status[i].count;
      return flirts;
    }
  },

  retireveNumberOfUsers:function () {
    for (var i in this.state.status) {
      var users = this.state.status[i].users;
      return users;
    }
  },

  retireveNumberOfAdmins:function () {
    for (var i in this.state.status) {
      var admins = this.state.status[i].admins;
      return admins;
    }
  },

  retrieveLikebackRate:function () {
      var i;var n;
      var j = 1;
      var couples = 1;
      var users = this.retireveNumberOfUsers();
      n = users - 2;
      for (i = 1; i <= n; i++)
      {
        j = j + 1;
        couples = couples + j;
      }

      var likebacks = this.retireveLikebacks();
      return (((likebacks / couples) * 100).toFixed(2));
    },

  render: function () {
    return (
      <div className="row">
        <div className="col-lg-3 col-xs-6">
          <div className="small-box bg-aqua">
            <div className="inner">
              <h3>{this.retireveLikebacks(this)}</h3>
              <p>Total Likebacks</p>
            </div>
            <div className="icon">
              <i className="ion ion-heart"></i>
            </div>
            <a className="small-box-footer">
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-xs-6">

          <div className="small-box bg-green">
            <div className="inner">
              <h3>{this.retrieveLikebackRate(this)}
                <sup styles={'font-size: 20px'}>%</sup>
              </h3>
              <p>Likeback Rate</p>
            </div>
            <div className="icon">
              <i className="ion ion-arrow-graph-up-right"></i>
            </div>
            <a  className="small-box-footer">
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-xs-6">

          <div className="small-box bg-yellow">
            <div className="inner">
              <h3>{this.retireveNumberOfUsers()}</h3>
              <p>Total Users</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-stalker"></i>
            </div>
            <a  className="small-box-footer">
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-xs-6">

          <div className="small-box bg-red">
            <div className="inner">
              <h3>{this.retireveNumberOfAdmins()}</h3>
              <p>Total Administrators</p>
            </div>
            <div className="icon">
              <i className="ion ion-person"></i>
            </div>
            <a  className="small-box-footer">
            </a>
          </div>
        </div>


        <Tabs/>

      </div>

    );
  },
});

export default Cards;
