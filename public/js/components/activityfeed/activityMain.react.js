import React from 'react';
import Card from './activityComp1.react';
import Paper from './newPaper.react';

  const ActivityMain=React.createClass({

         render:function(){
           return(
                   <div>
                   <div className='col-xs-4'><Paper/></div>
                   <div className='col-xs-7'><Card/></div>
                   </div>

           );
         }
  });

export default ActivityMain;
