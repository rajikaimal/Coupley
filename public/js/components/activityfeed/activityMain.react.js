import React from 'react';
import Paper from './newPaper.react';
import Card from './activityComp1.react'
import ActivityContainer from './activityContainer.react';
import ActivityList from './activityListComp.react';
import CommentBox from './CommentBox.react';

  const ActivityMain=React.createClass({

         render:function(){
           return(
                   <div>
                   <div><Paper/></div> 
                   <div><ActivityContainer/></div>
                   </div>

           );
         }
  });

export default ActivityMain;
