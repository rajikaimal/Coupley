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
import BlockActions from '../../../../actions/admin/blockUser';

//tap-event-plugin
injectTapEventPlugin();
const path = '../../../../../../img/profilepics/';
const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.deepPurple500} />
    </IconButton>
);

const Friend = React.createClass({
  _handleUserId: function () {
    //alert(this.props.id);
    let credentials = {
      id:this.props.id,
      rowId:this.props.rowId,
    };
    swal({ title: 'Are you sure?',
            text: 'Do you really want to block this user?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, Block!',
            cancelButtonText: 'No, Cancel!',
            closeOnConfirm: false,
            closeOnCancel: false, },
            function (isConfirm) {
              if (isConfirm) {
                swal('Blocked!', 'This person has been blocked.', 'success');
                BlockActions.block(credentials);
              } else {
                swal('Cancelled', 'This person has not been blocked.', 'error');
              } });

  },

  _redirect: function () {
    const path = '/#/' + this.props.username;
  },

  render: function () {
    return (
        <div>
                <ListItem
                style={{ backgroundColor: Colors.pink50, height:150 }}
                leftAvatar={<Avatar size="60" src={path + this.props.profilepic} />}
                primaryText={
                    <p> {this.props.reported}<br/><br/><br/>
                    <h4>{this.props.description}</h4>
                    </p>
                    }
                secondaryText={
                    <p>
                      -Reported by {this.props.user}
                    </p>
                    }
                secondaryTextLines={2}
                rightIconButton={<IconMenu iconButtonElement={iconButtonElement} >
                                            <MenuItem  onTouchTap={this._handleUserId}>Block user</MenuItem>
                                 </IconMenu>}
                 />
                            <Divider inset={true} />

        </div>
    );
  },
});

export default Friend;
