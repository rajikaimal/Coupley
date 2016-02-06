/**
 * Created by Isuru 1 on 30/01/2016.
 */
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import snack from './snackbar.react';
import Snackbar from 'material-ui/lib/snackbar';
import CardTitle from 'material-ui/lib/card/card-title';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import Paper from 'material-ui/lib/paper';
import CardText from 'material-ui/lib/card/card-text';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import Table from 'material-ui/lib/table/table';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Colors from 'material-ui/lib/styles/colors';

import ProfileActions from '../../../actions/admin/ProfileActions';
import ProfileStore from '../../../stores/admin/ProfileStore';

import UpdateActions from '../../../actions/admin/AdminUpdateActions';

const tilesData = [
    {
        img: '../../../../img/edit.png',
        title: 'Update Profile'

    }

];
const style = {
    width: 300,
    height:50,
    fontSize: "20px"

};
const newdiv = {
    marginLeft: 300

};

const tileElements = tilesData.map(tile => <GridTile
    key={tile.img}
    title={<FlatButton label={tile.title} secondary={true} style={style} linkButton={true}  />}

><img src={tile.img} /></GridTile>);
const gridListStyle = {width: 600, height: 220, overflowY: 'auto'};

const customContentStyle = {
    width: '100%'

};
const err = {"color": "red"};
const registerStyle = {
    marginTop: 50,
    marginLeft: 500
};

const styles = {
    button: {
        margin: 12

    },
    errorStyle: {
        color: Colors.pink500
    }
};
const buttonStyle = {
    marginTop: 25
}


function validatefirstname(firstname) {
    if (firstname.length >= 50) {
        return {
            "error": "*Firstname is too long"
        }
    }
    else if (firstname.trim() == "") {
        return {
            "error": "*Firstname cannot be empty"
        }
    }
    else if (!/^\w+$/i.test(firstname)) {
        return {
            "error": "*Firstname cannot contain special characters"
        }
    }
    else {
        return true;
    }
}

function validatelastname(lastname) {
    if (lastname.length >= 50) {
        return {
            "error": "*Lastname is too long"
        }
    }
    else if (lastname.trim() == "") {
        return {
            "error": "*Lastname cannot be empty"
        }
    }
    else if (!/^\w+$/i.test(lastname)) {
        return {
            "error": "*Lastname cannot contain special characters"
        }
    }
    else {
        return true;
    }
}

function validatejobname(job) {
    if (firstname.length >= 20) {
        return {
            "error": "*Jobname is too long"
        }
    }
    else if (job.trim() == "") {
        return {
            "error": "*Jobname cannot be empty"
        }
    }
    else {
        return true;
    }
}

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        return true;
    }
    else if (email.trim() == "") {
        return {
            "error": "*Email cannot be empty"
        }
    }
    else {
        return false;
    }
}

var Update = React.createClass({
    getInitialState: function () {
        return {
            open: false,
            opens: false,
            data:ProfileStore.getuserdata()
        };
    },
    componentDidMount: function() {
        ProfileActions.getAdminProfileData(); ProfileStore.addChangeListener(this._onChange)

    },
    _onChange: function() {
        this.setState(ProfileStore.getuserdata());
    },
    handleOpen: function () {
        this.setState({open: true, opens: false});
    },
    handleClose: function () {
        this.setState({open: false});
    },
    handleTouchTap: function () {
        this.setState({
            opens: true
        });

    },
    handleBoth: function () {
        if (this._handleRegisterClickEvent()) {
            this.handleTouchTap();
            this.handleClose();
        }
    },

    _handleRegisterClickEvent: function () {
        let firstname = this.refs.firstname.getValue();
        let lastname = this.refs.lastname.getValue();
        let job = this.refs.job.getValue();
        let email = this.refs.email.getValue();


        if (validatefirstname(firstname).error) {
            document.getElementById('firstname').innerHTML = validatefirstname(firstname).error;
            return false;
        }
        if (validatelastname(lastname).error) {
            document.getElementById('lastname').innerHTML = validatelastname(lastname).error;
            return false;
        }
        if (validatejobname(job).error) {
            document.getElementById('job').innerHTML = validatejobname(job).error;

            return false;
        }
        if (!validateEmail(email)) {
            document.getElementById('email').innerHTML = '*Invalid Email !';
            return false;
        }

        else {
            let credentials = {
                id: this.state.id,
                firstname: firstname,
                lastname: lastname,
                job: job,
                email: email

            };
            UpdateActions.checks(credentials);
            console.log('Done calling !');

        }
    },
eleminateErrors :function(){
    document.getElementById('firstname').innerHTML = " ";
    document.getElementById('lastname').innerHTML = " ";
    document.getElementById('job').innerHTML = " ";
    document.getElementById('email').innerHTML = " ";
},
    render: function () {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Update"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleBoth}
            />,
        ];
        return (
            <div className="" style={{"margin-left": "38%", "position": "relative",
                "min-height": "1px",
                "padding-right": "15px",
                "padding-left": "15px"}}>

                <div className="">
                    <div >
                {/* Basic grid list with mostly default options */}
                        <GridList
                            cellHeight={200}
                            style={gridListStyle}
                            onTouchTap={this.handleOpen}
                        >
                  {tileElements}
                        </GridList>
                    </div>

                </div>


             {/* modal content */}
                <Dialog
                    title="Update Your Profile"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={customContentStyle}
                >


                    <div>
                        <div>

                            <div className="col-lg-12">
                                <Card>

                                    <CardText onFocus={this.eleminateErrors}>
                                        <div className="col-lg-6">
                                            <TextField
                                                hintText="Firstname" hintStyle={styles.errorStyle} floatingLabelText="Firstname" fullwidth={true} ref="firstname" defaultValue={this.state.firstname}/>
                                            <br />
                                            <span id="firstname" style={err}> </span>
                                            <br/>
                                            <br/>
                                            <TextField
                                                hintText="Job Position" hintStyle={styles.errorStyle} floatingLabelText="Job Position" fullwidth={true} ref="job" defaultValue={this.state.job}/>
                                            <br />
                                            <span id="job" style={err}> </span>
                                            <br />
                                            <br />

                                        </div>
                                        <div className="col-lg-6">
                                            <TextField
                                                hintText="Lastname" hintStyle={styles.errorStyle} floatingLabelText="Lastname" fullwidth={true} ref="lastname" defaultValue={this.state.lastname}/>
                                            <br />
                                            <span id="lastname" style={err}> </span>
                                            <br />
                                            <br />
                                            <TextField
                                                hintText="Email" hintStyle={styles.errorStyle} floatingLabelText="Email" fullwidth={true} ref="email" defaultValue={this.state.email}/>
                                            <br />

                                            <span id="email" style={err}> </span>
                                            <br />
                                            <br />

                                        </div>

                                    </CardText>
                                    <CardActions>

                                    </CardActions>
                                </Card>
                            </div>

                        </div>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.opens}
                    message="Successfully updated your profile"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        );
    }
});

export default Update;
