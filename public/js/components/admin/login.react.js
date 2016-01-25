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



const Adminlogin = React.createClass({
    getInitialState: function() {
        return {
            username: "",
            password: ""
        }
    },
    _handleLogin: function() {
        let username = this.refs.username.getValue();
        let password = this.refs.password.getValue();
        let credentials = {
            username: username,
            password: password
        };
        LoginActions.login(credentials);
        console.log('Done calling !');
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
                        floatingLabelText="username" ref="username" />
                    <TextField
                        floatingLabelText="password" ref="password" />

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