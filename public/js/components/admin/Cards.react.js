/**
 * Created by Isuru 1 on 21/01/2016.
 */
import React from 'react';
import { Link } from 'react-router';
import CustomerGraph from './graphs/customers.react';
import PieGraph from './graphs/pieChartCustomers.react';

const Cards = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-lg-3 col-xs-6">
          <div className="small-box bg-aqua">
            <div className="inner">
              <h3>150</h3>
              <p>Flirts</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
            </div>
            <a className="small-box-footer">More info
              <i className="fa fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-xs-6">

          <div className="small-box bg-green">
            <div className="inner">
              <h3>53
                <sup styles={'font-size: 20px'}>%</sup>
              </h3>
              <p>Flirt Rate</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars"></i>
            </div>
            <a  className="small-box-footer">More info
              <i className="fa fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-xs-6">

          <div className="small-box bg-yellow">
            <div className="inner">
              <h3>44</h3>
              <p>User Registrations</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add"></i>
            </div>
            <a  className="small-box-footer">More info
              <i className="fa fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-xs-6">

          <div className="small-box bg-red">
            <div className="inner">
              <h3>65</h3>
              <p>Unique Visitors</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph"></i>
            </div>
            <a  className="small-box-footer">More info
              <i className="fa fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>

        <CustomerGraph/>
        <PieGraph/>

      </div>

    );
  },
});

export default Cards;
