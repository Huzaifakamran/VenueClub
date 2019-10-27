import React, { Component } from 'react'
import ArrowBack from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import Message from '@material-ui/icons/Message';
import { Button } from '@material-ui/core';
import firebase from '../../../config/firebase'
import swal from 'sweetalert';
import Footer from '../../header-footer/Footer';

class Setting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newPassword: '',
            confirm: ''      
        }
    }
    updateServer() {
        const { user } = this.state
        firebase.database().ref('users').child(`${user['key']}`).update(user)
      }
    changePassword() {
        const { newPassword, confirm } = this.state
        if (newPassword !== confirm) {
          swal({
            title: "Password did not match",
            icon: "warning",
            dangerMode: true,
          })
          return
        }
        this.setState({ disable1: true })
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.updatePassword(newPassword)
              .then(() => {
                this.setState({
                  newPassword: '',
                  confirm: ''
                })
                swal({
                  title: "Password Updated Successfully",
                  icon: "success"
                })
              }).catch((error) => {
                this.setState({
                  newPassword: '',
                  confirm: ''
                })
                swal({
                  title: error,
                  icon: "warning",
                  dangerMode: true,
                })
              });
          }
        });
      }
      
    render() {
        const { user, newPassword, confirm } = this.state
        return (
            <div>
                <AppBar style={{ background: '#3c3c3c' }} position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" >
               <IconButton color="inherit" title="Back">
                  <ArrowBack onClick={() => window.location.href = '/adminDashboard'} />   
                </IconButton>&nbsp;&nbsp; Admin | Account Setting
            </Typography>
            <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>

              <IconButton color="inherit" title="Profile" >
                <UserIcon />
              </IconButton>
                </div>

          </Toolbar>
        </AppBar>

        <div style={{ marginTop: '100px', marginBottom: '10px', marginLeft: '25%', marginRight: '25%', borderStyle: 'ridge', borderWidth: '1px' }}>
        <div className="form-row mt-2" style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '40px' }}>
            <div className="col" style={{ borderStyle: 'ridge', borderWidth: '1px' }}>
              <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '40px', marginBottom: '40px' }}>
                <h2>Change Password</h2>
                <hr />
                {/* <label for="inputPassword">Current password</label>
                <input type="password" className="form-control" /> */}

                <label for="inputPassword">New password</label>
                 <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={(e) => this.setState({ newPassword: e.target.value }, () => {
                  if (this.state.newPassword.length && this.state.confirm.length) {
                    this.setState({ disable1: false })
                  }
                  else {
                    this.setState({ disable1: true })
                  }
                })} /> 

                <label for="inputPassword">Confirm password</label>
                <input type="password" className="form-control" name="confirm" value={confirm} onChange={(e) => this.setState({ confirm: e.target.value }, () => {
                  if (this.state.newPassword.length && this.state.confirm.length) {
                    this.setState({ disable1: false })
                  }
                  else {
                    this.setState({ disable1: true })
                  }
                })} /> 
                <br />

                <button type="submit" className="btn btn-success" disabled={this.state.disable1} onClick={() => this.changePassword()}  >Change Password</button>


              </div>
            </div>

            <div className="col" style={{ borderStyle: 'ridge', borderWidth: '1px' ,marginTop:'10px'}}>
              <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '40px', marginBottom: '40px' }}>
                <h2>Delete Account</h2>
                <hr />
                <br />

                <button type="submit" className="btn btn-danger">Delete Account</button><br /><br />
                <p>This action can not be undone</p>

              </div>
            </div>
          </div>
          </div>
          <Footer/>
            </div>
        )
    }
}

export default Setting