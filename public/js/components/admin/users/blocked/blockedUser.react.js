import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import injectTapEventPlugin from 'react-tap-event-plugin';
import UnBlockActions from '../../../../actions/admin/UnblockUserActions';

//tap-event-plugin

const path = '../../../../../../img/profilepics/';
const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.deepPurple500} />
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Unblock user</MenuItem>
    </IconMenu>
);

const blocked = React.createClass({
  _handleUserId: function () {
    //alert(this.props.id);
    let credentials = {
      id:this.props.id,
    };
    swal({ title: 'Are you sure?',
            text: 'Do you really want to unblock this user?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, Unblock!',
            cancelButtonText: 'No, Cancel!',
            closeOnConfirm: false,
            closeOnCancel: false, },
            function (isConfirm) {
              if (isConfirm) {
                swal('Unblocked!', 'This person has been unblocked.', 'success');
                UnBlockActions.Unblock(credentials);
              } else {
                swal('Cancelled', 'This person is still blocked.', 'error');
              } });

  },

  _redirect: function () {
    document.location = '/#/' + this.props.username;
  },

  render: function () {
    return (
        <div>
          <ListItem
              style={{ backgroundColor: Colors.red500, height:120 }}
              leftAvatar={<Avatar size="80" src={path + this.props.profilepic} />}
              secondaryText={
                   <p>
                      <b style={{ color: Colors.yellow50 }}> &#160;&#160;&#160;&#160;&#160;&#160;{this.props.firstname} {this.props.lastname} </b>
                      <br/>
                      <span style={{ color: Colors.darkBlack }}>&#160;&#160;&#160;&#160;&#160;&#160;&#160;{this.props.gender}</span>
                    </p>
                    }
              secondaryTextLines={2}
              rightIconButton={<IconMenu iconButtonElement={iconButtonElement} >
                                   <MenuItem  onTouchTap={this._handleUserId}>Unblock user</MenuItem>
                               </IconMenu>}
          />
          <Divider inset={true} />
        </div>
    );
  },
});

export default blocked;
