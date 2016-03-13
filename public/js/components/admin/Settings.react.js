/**
 * Created by Isuru 1 on 21/01/2016.
 */
import React from 'react';
import { Link } from 'react-router';

const Settings = React.createClass({
  render: function () {
    return (
      <div className="settings">
        <aside className="control-sidebar control-sidebar-dark">
          <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
          </ul>

          <div className="tab-content">
            <div className="tab-pane" id="control-sidebar-home-tab">
            </div>
            <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
          </div>
        </aside>
      </div>
    );
  },
});

export default Settings;
