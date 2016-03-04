import React from 'react';
import MessageThread from './chatCard.react';
import ChatPreviousContainer from './ChatPreviousContainer.react';

const ThreadMain = React.createClass({

  render:function () {

    return (
       <div>

                   <div className="col-xs-3"><ChatPreviousContainer/></div>
                   <div  className="col-xs-1"/>
                   <div className="col-xs-8"><MessageThread /></div>
                   </div>

    );

  },

});

export default ThreadMain;
