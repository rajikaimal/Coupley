/**
 * Created by Isuru 1 on 21/01/2016.
 */
import React from 'react';
import { Link } from 'react-router';

const Path = React.createClass({
  render: function () {
    return (
      <div className="path">
        <section className="content-header">
          <h1>
            Dashboard
            <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a >
                <i className="fa fa-dashboard"></i>
                Home</a>
            </li>
            <li className="active">Dashboard</li>
          </ol>
        </section>
      </div>
    );
  },
});

export default Path;
