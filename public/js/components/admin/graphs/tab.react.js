/**
 * Created by isuru on 3/17/16.
 */
import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import CustomerGraph from './customers.react';
import PieGraph from './pieChartCustomers.react';

import Item from './../graphs/adminPanel/admin.react';

import SearchStore from '../../../stores/admin/SearchStore';
import AdminActions from '../../../actions/admin/AdminDetailsActions';

//tap-event-plugin

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

var DashboardTabs = React.createClass({
  getInitialState: function () {
    return {
      results: SearchStore.getresults(),
    };
  },

  componentDidMount: function () {
    AdminActions.getAdmins();
    SearchStore.addChangeListener(this._onChange);
  },

  componentWillUnmount:function () {
    SearchStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      results: SearchStore.getresults(),
    });
  },

  _renderSearchItem: function () {
    if (this.state.results) {
      return this.state.results.map((result) => {
        return (<div className="col-lg-4">
          <Item key={result} name={result.name} profilepic={result.profilepic}
                job={result.job} status={result.status}  />
        </div>);
      });
    }    else {
      return (<div className="col-lg-3">
        No any Administrators found.
      </div>);
    }
  },

  render: function () {
    return (
        <div>
          <Tabs>
            <Tab label="ANALYTICS">
              <div style={styles.slide}>
                <CustomerGraph/> <PieGraph/>
              </div>
            </Tab>
            <Tab label="ADMIN PANEL">
              <div style={styles.slide}>
                <ul>
                  {this._renderSearchItem()}
                </ul>
              </div>
            </Tab>
          </Tabs>
        </div>
    );
  },
});

export default DashboardTabs;
