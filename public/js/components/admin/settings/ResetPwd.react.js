/**
 * Created by Isuru 1 on 06/02/2016.
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
import PwdActions from '../../../actions/admin/AdminPwdResetActions';

const tilesData = [
    {
      img: '../../../../img/lock-256.png',
      title: 'Reset Password',

    },

];
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
const gridListStyle = { width:600, height: 220, overflowY: 'auto' };

const customContentStyle = {
  width: '100%',

};
const err = { color: 'red' };

const styles = {
  button: {
    margin: 12,

  },
  errorStyle: {
    color: Colors.pink500,
  },
};

function validatePassword(password) {
  if (password.length < 6) {
    return {
      error: '*Password length must be 6 or more',
    };
  }

  let re = /[0-9]/;
  if (!re.test(password)) {
    return {
      error: '*Password must contain a number',
    };
  }

  re = /[a-z]/;
  if (!re.test(password)) {
    return {
      error: '*Password must contain a lowercase letter',
    };
  }

  re = /[A-Z]/;
  if (!re.test(password)) {
    return {
      error: '*Password must contain a uppercase letter',
    };
  }  else {
    return true;
  }
}

function validateRePassword(Repassword, password) {
  if (!(Repassword == password)) {
    return {
      error: '*Password Doesnt match',
    };
  }  else {

    return {
      success: '*Password matches',
    };
  }
}

var Reset = React.createClass({
  getInitialState: function () {
    return {
      open: false,
      opens: false,
      data:ProfileStore.getuserdata(),
    };
  },

  componentDidMount: function () {
    ProfileActions.getAdminProfileData(); ProfileStore.addChangeListener(this._onChange);

  },

  _onChange: function () {
    this.setState(ProfileStore.getuserdata());
  },

  handleOpen: function () {
    this.setState({ open: true, opens: false });
  },

  handleClose: function () {
    this.setState({ open: false });
  },

  handleTouchTap: function () {
    this.setState({
      opens: true,
    });

  },

  handleBoth: function () {
    if (this._handleResetClickEvent()) {
      this.handleTouchTap();
      this.handleClose();
    }
  },

  reEnterPwd: function () {
    let newpassword = this.refs.newpassword.getValue();
    let RePass = this.refs.repassword.getValue();
    if (validateRePassword(RePass, newpassword).error) {
      document.getElementById('repassword').innerHTML = validateRePassword(RePass, newpassword).error;
      document.getElementById('repassword').style.color = '#ff6666';
    }    else {
      document.getElementById('repassword').innerHTML = validateRePassword(RePass, newpassword).success;
      document.getElementById('repassword').style.color = '#66cc66';
    }
  },

  _handleResetClickEvent: function () {
    let newpassword = this.refs.newpassword.getValue();
    let oldpassword = this.refs.oldpassword.getValue();

    if (validatePassword(newpassword).error) {
      document.getElementById('newpassword').innerHTML = validatePassword(newpassword).error;
      return false;
    }    else {
      let credentials = {
        email:this.state.email,
        newpassword: newpassword,
        password: oldpassword,
      };
      PwdActions.reset(credentials);
      console.log(this.state.email);
    }
  },

  eleminateErrors:function () {
    document.getElementById('oldpassword').innerHTML = ' ';
    document.getElementById('newpassword').innerHTML = ' ';
    document.getElementById('repassword').innerHTML = ' ';

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
        <div className="" style={{ 'margin-left': '38%', top: '-218px', position: 'relative',
            'min-height': '1px',
            'padding-right': '15px',
            'padding-left': '15px', }}>

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
          <Dialog
              title="Reset Password"
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
                      <div className="col-lg-12 text-center">
                        <TextField
                            type="password"
                            hintText="Current Password" floatingLabelText="Current Password" ref="oldpassword" hintStyle={styles.errorStyle} fullwidth={true}/>
                        <br />
                        <span id="oldpassword" style={err}> </span>
                        <br />
                        <br />
                        <TextField
                            type="password"
                            hintText="New Password" floatingLabelText="New Password" ref="newpassword" hintStyle={styles.errorStyle} fullwidth={true} onChange={this.reEnterPwd}/>
                        <br />
                        <span id="newpassword" style={err}> </span>
                        <br />
                        <br />
                        <TextField
                            type="password"
                            hintText="Retype New Password" floatingLabelText="Retype New Password" ref="repassword" hintStyle={styles.errorStyle} fullwidth={true} onChange={this.reEnterPwd}/>
                        <br />
                        <span id="repassword" style={err}> </span>
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
              message="Successfully updated the password"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
        </div>
    );
  },
});

export default Reset;
