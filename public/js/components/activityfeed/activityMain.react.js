import React from 'react';
import Card from './activityComp1.react';
import Paper from './newPaper.react';


  const ActivityMain=React.createClass({

         render:function(){
           return(
                   <div>
                   <div className='pagination-centered'><Paper/>

                   </div>

                   <div className='pagination-centered'><Card/></div>
                   </div>

           );
         }
  });

export default ActivityMain;
