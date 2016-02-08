import React from 'react';
import LoginActions from '../actions/LoginActions';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

const Forgot = React.createClass({
    sendemail: function () {
        let email = this.refs.email.getValue();
        let resetemail = {
            email: email
        }
        LoginActions.resetpassword(resetemail);
    },
    render: function () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4">

                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <Card>
                            <CardHeader
                                title="Reset your password"/>
                            <CardText>
                                <TextField
                                    floatingLabelText="email" ref="email" fullwidth={true}/>
                            </CardText>
                            <CardActions>
                                <FlatButton label="Reset password" onClick={this.sendemail}/>
                            </CardActions>
                        </Card>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4">

                    </div>
                </div>
            </div>
        );
    }
});

export default Forgot;