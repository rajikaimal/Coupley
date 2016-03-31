import React from 'react';
import ActivityContainer from './activityContainer.react';
import ActivityList from './activityListComp.react';
import CommentBox from '../../../comments/CommentBox.react';

const ActivityMain = React.createClass({

    render: function () {
        return (
            <div>
                <div>
                    <ActivityContainer/>
                </div>
            </div>

        );
    }
});

export default ActivityMain;
