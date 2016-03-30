import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import IconButton from 'material-ui/lib/icon-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Dialog from 'material-ui/lib/dialog';
import OtherV from './othersvisits.react';
import MyV from './myvisits.react';


const style1 = {
  width: 400,
}



const VisitContainer = React.createClass({

      render:function(){
             return(

               <Card>
                 <Tabs>
                  <Tab label="My Visits" >
                   <div>
                    <Divider inset={false} />
                   </div>
                  </Tab>
                  <Tab label="Visits to my profile" >
                   <div>
                    <Divider inset={false} />
                   </div>
                  </Tab>
                 </Tabs>
               </Card>

             );
      }

});

export default VisitContainer;
