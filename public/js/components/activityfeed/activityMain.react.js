import React from 'react';
import StatusBox from './activityBox.react';
import ActivityContainer from './activityContainer.react';
import ActivityList from './activityListComp.react';

const ActivityMain = React.createClass({

    render: function () {
        return (
            <div>
                <div>
                    <StatusBox/>
                </div>
                <div>
                    <ActivityContainer/>
                </div>
            </div>

        );
    }
});

export default ActivityMain;
