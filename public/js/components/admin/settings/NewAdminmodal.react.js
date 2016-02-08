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

import RegisterActions from '../../../actions/admin/AdminRegisterActions';

const tilesData = [
    {
        img: '../../../../img/add_users_group-512.png',
        title: 'New Administrator',

    }

];
const style = {
    width: 300,
    height:50,
    fontSize: "20px"

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
    if (firstname.length >= 50) {
        return {
            "error": "*Lastname is too long"
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
    else if (!/^\w+$/i.test(job)) {
        return {
            "error": "*Jobname cannot contain special characters"
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
    else {
        return false;
    }
}

function validatePassword(password) {
    if (password.length < 6) {
        return {
            "error": "*Password length must be 6 or more"
        }
    }
    let re = /[0-9]/;
    if (!re.test(password)) {
        return {
            "error": "*Password must contain a number"
        }
    }
    re = /[a-z]/;
    if (!re.test(password)) {
        return {
            "error": "*Password must contain a lowercase letter"
        }
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
        return {
            "error": "*Password must contain a uppercase letter"
        }
    }
    else {
        return true;
    }
}
function validateRePassword(Repassword, password) {
    if (!(Repassword == password)) {
        return {
            "error": "*Password Doesnt match"
        }
    }
    else {

        return {
            "success": "*Password matches"
        }
    }
}

var Header = React.createClass({
    getInitialState: function () {
        return {
            open: false,
            opens: false
        };
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
    reEnterPwd: function () {
        let password = this.refs.password.getValue();
        let RePass = this.refs.repassword.getValue();
        if (validateRePassword(RePass, password).error) {
            document.getElementById('repassword').innerHTML = validateRePassword(RePass, password).error;
            document.getElementById('repassword').style.color = "#ff6666";
        }
        else {
            document.getElementById('repassword').innerHTML = validateRePassword(RePass, password).success;
            document.getElementById('repassword').style.color = "#66cc66";
        }
    }

    ,
    _handleRegisterClickEvent: function () {
        let firstname = this.refs.firstname.getValue();
        let lastname = this.refs.lastname.getValue();
        let job = this.refs.job.getValue();
        let email = this.refs.email.getValue();
        let password = this.refs.password.getValue();

        if (validatefirstname(firstname).error) {
            document.getElementById('firstname').innerHTML = validatefirstname(firstname).error;
            return false;
        }
        else if (validatelastname(lastname).error) {
            document.getElementById('lastname').innerHTML = validatelastname(lastname).error;
            return false;
        }
        else if (validatejobname(job).error) {
            document.getElementById('job').innerHTML = validatejobname(job).error;
            return false;
        }
        else if (!validateEmail(email)) {
            document.getElementById('email').innerHTML = '*Invalid Email !';
            return false;
        }
        else if (validatePassword(password).error) {
            document.getElementById('password').innerHTML = validatePassword(password).error;
            return false;
        }
        else {
            let credentials = {
                firstname: firstname,
                lastname: lastname,
                job: job,
                email: email,
                password: password
            };
            RegisterActions.checks(credentials);
            console.log('Done calling !');

        }
    },

    render: function () {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleBoth}
            />,
        ];
        return (
            <div className="" style={{"margin-left": "86%","top": "-218px", "position": "relative",
                "min-height": "1px",
                "padding-right": "15px",
                "padding-left": "15px"}}>

                <div className="">

                    <div>

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
                    title="Add New Administrator"
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

                                    <CardText>
                                        <div className="col-lg-6">
                                            <TextField
                                                hintText="Firstname" hintStyle={styles.errorStyle} fullwidth={true} ref="firstname"/>
                                            <br />
                                            <span id="firstname" style={err}> </span>
                                            <br/>
                                            <br/>
                                            <TextField
                                                hintText="Job Position" hintStyle={styles.errorStyle} fullwidth={true} ref="job"/>
                                            <br />
                                            <span id="job" style={err}> </span>
                                            <br />
                                            <br />
                                            <snack/>
                                            <TextField
                                                type="password"
                                                hintText="Password" ref="password" hintStyle={styles.errorStyle} fullwidth={true}/>
                                            <br />
                                            <span id="password" style={err}> </span>
                                            <br />
                                            <br />
                                        </div>
                                        <div className="col-lg-6">
                                            <TextField
                                                hintText="Lastname" hintStyle={styles.errorStyle} fullwidth={true} ref="lastname"/>
                                            <br />
                                            <span id="lastname" style={err}> </span>
                                            <br />
                                            <br />
                                            <TextField
                                                hintText="Email" hintStyle={styles.errorStyle} fullwidth={true} ref="email"/>
                                            <br />

                                            <span id="email" style={err}> </span>
                                            <br />
                                            <br />
                                            <TextField
                                                type="password"
                                                hintText="ReEnter Password" ref="repassword" hintStyle={styles.errorStyle} fullwidth={true} onChange={this.reEnterPwd}/>
                                            <br />
                                            <span id="repassword"> </span>
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
                    message="Successfully added a New Administrator to your system"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        );
    }
});

export default Header;
