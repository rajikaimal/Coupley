/**
 * Created by isuru on 3/17/16.
 */
import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import CustomerGraph from './customers.react';
import PieGraph from './pieChartCustomers.react';
import injectTapEventPlugin from 'react-tap-event-plugin';

//tap-event-plugin
injectTapEventPlugin();

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

  render: function () {
    return (
        <div>
          <Tabs>
            <Tab label="USAGE">
              <div style={styles.slide}>
                <CustomerGraph/> <PieGraph/>
              </div>
            </Tab>
            <Tab label="ADMIN PANEL">
              <div style={styles.slide}>

              </div>
            </Tab>
          </Tabs>
        </div>
    );
  },
});

export default DashboardTabs;
