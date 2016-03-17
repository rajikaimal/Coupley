import React from 'react';
import Paper from './newPaper.react';
import ActivityContainer from './activityContainer.react';
import ActivityList from './activityListComp.react';
//import Commentsbox from '../../activityfeed/Commentsbox.react';

const ActivityMain = React.createClass({

    render: function () {
        return (
            <div>
                <div>
                    <Paper/>
                </div>
                <div>
                    <ActivityContainer/>
                </div>
            </div>

        );
    }
});

export default ActivityMain;
