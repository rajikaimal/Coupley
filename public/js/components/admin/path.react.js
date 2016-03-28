/**
 * Created by Isuru 1 on 21/01/2016.
 */
import React from 'react';
import { Link } from 'react-router';
import PathStore from './../../stores/admin/PathStore';

const Path = React.createClass({
  getInitialState: function () {
    return PathStore.getpath();
  },

  componentDidMount: function () {
    PathStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(
      PathStore.getpath()
    );
  },

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
                HOME</a>
            </li>
            <li className="active">{this.state.path}</li>
          </ol>
        </section>
      </div>
    );
  },
});

export default Path;