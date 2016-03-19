/**
 * Created by Isuru 1 on 06/02/2016.
 */
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import CardTitle from 'material-ui/lib/card/card-title';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import Paper from 'material-ui/lib/paper';
import CardText from 'material-ui/lib/card/card-text';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import Colors from 'material-ui/lib/styles/colors';

import ProfileActions from '../../../actions/admin/ProfileActions';
import ProfileStore from '../../../stores/admin/ProfileStore';
import DeactivateActions from '../../../actions/admin/DeactivateAdminActions';

const tilesData = [
    {
      img: '../../../../img/shutdown1-256.png',
      title: 'Deactivate',

    },

];
const divStyle = {
  marginLeft: '86%',
  top: '-436px',
  position: 'relative',
  minHeight: '1px',
  paddingRight: '15px',
  paddingLeft: '15px',
};
const style = {
  width: 300,
  height:50,
  fontSize: '20px',
  color:'white',
};
const tileElements = tilesData.map(tile => <GridTile
    key={tile.img}
    title={<FlatButton label={tile.title} secondary={true} style={style} linkButton={true}  />}

><img src={tile.img} /></GridTile>);
const gridListStyle = {
  width:600,
  height: 220,
  overflowY: 'auto',
};

var Deactivate = React.createClass({
  getInitialState: function () {
    return {
      data:ProfileStore.getuserdata(),
    };
  },

  componentDidMount: function () {
    ProfileActions.getAdminProfileData();
    ProfileStore.addChangeListener(this._onChange);

  },

  _onChange: function () {
    this.setState(ProfileStore.getuserdata());
  },

  handleDelete: function () {
    let credentials = {
      id:this.state.id,
    };

    swal({ title: 'Are you sure? You are going to deactivate your account..',
          text: 'If you proceed.. You\'ll no longer getting any notifications from Coupley. ' +
          'Do you really want to deactivate your account?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, Deactivate!',
          cancelButtonText: 'No, Cancel!',
          closeOnConfirm: false,
          closeOnCancel: false, },
        function (isConfirm) {
          if (isConfirm) {
            DeactivateActions.deactivate(credentials);
          } else {
            swal('Cancelled', 'Your account is safe.', 'error');
          } });

  },

  render: function () {

    return (
        <div style={divStyle}>
              <GridList
                  cellHeight={200}
                  style={gridListStyle}
                  onTouchTap={this.handleDelete}
              >
                {tileElements}
              </GridList>
        </div>
    );
  },
});

export default Deactivate;
