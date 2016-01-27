/**
 * Created by Isuru 1 on 24/01/2016.
 */
import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import LoginActions from '../../actions/admin/LoginActions';
import LoginStore from '../../stores/LoginStore';



const Adminlogin = React.createClass({
    getInitialState: function() {
        console.log(LoginStore.getState());
        return {
            apitoken: LoginStore.getState()
        };
    },
    componentDidMount: function() {
        LoginStore.addChangeListener(this._onChange);
        if(this.state.apitoken) {
            document.location = "/cp-admin#/cards";
        }
        else {
            document.location = "/cp-admin#/AdminLogin";
        }
    },
    _onChange: function() {
        this.setState({ apitoken: LoginStore.getState() });
        if(this.state.apitoken) {
            document.location = "/cp-admin#/cards";
        }
        else {
            document.location = "/cp-admin#/AdminLogin";
        }
    },
    _handleLogin: function() {
        let email = this.refs.email.getValue();
        let password = this.refs.password.getValue();
        let credentials = {
            email: email,
            password: password
        };
        LoginActions.login(credentials);
        console.log('Done calling!');

        if (email.trim() == "") {
            alert("Email field is empty, Please fill the email!");
            this.refs.email.focus();
        }
        else if (password.trim() == "") {
            alert("Password field is empty, Please fill the password!");
            this.refs.password.focus();
        }
    },
    render: function() {
        return (
            <div>

<div className="container">

            <div className="col-lg-6 col-lg-offset-3 text-center">
            <Card style={ {marginTop: 60} }>

                <CardTitle title="Welcome Back.." subtitle="Coupley &trade;"/>
                <CardActions>
                    <TextField
                        floatingLabelText="Enter your email" ref="email" />
                    <TextField
                        floatingLabelText="Enter your password" ref="password" type="password" />

                </CardActions>
                <CardText>
                    <RaisedButton label="Signin"  primary={true} onTouchTap={this._handleLogin} />
                </CardText>
            </Card>
            </div>

                </div>
                </div>
        );
    }

});

export default Adminlogin;