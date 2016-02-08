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

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.deepPurple500} />
    </IconButton>
);

const Friend = React.createClass({
    _handleUserId: function() {
       //alert(this.props.id);
        let credentials = {
            id:this.props.id
        };
        swal({  title: "Are you sure?",
                text: "Do you really want to block this user?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Block!",
                cancelButtonText: "No, Cancel!",
                closeOnConfirm: false,
                closeOnCancel: false },
            function(isConfirm){
                if (isConfirm) {
                    swal("Blocked!", "This person has been blocked.", "success");
                    BlockActions.block(credentials);
                } else {
                    swal("Cancelled", "This person has not been blocked.", "error");
                } });

    },
    _redirect: function () {
        const path = "/#/" + this.props.username;
    },

    render: function () {
        return (
            <div>
                <ListItem
                    style={{backgroundColor: Colors.pink50}}
                    leftAvatar={<Avatar src="https://s-media-cache-ak0.pinimg.com/236x/dc/15/f2/dc15f28faef36bc55e64560d000e871c.jpg" />}
                    primaryText={this.props.heading}
                    secondaryText={
                        <p>
                            <b> {this.props.firstname} {this.props.lastname} </b>
                            <br/>
                            <span style={{color: Colors.darkBlack}}>{this.props.gender}</span>


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
    }
});

export default Friend;
