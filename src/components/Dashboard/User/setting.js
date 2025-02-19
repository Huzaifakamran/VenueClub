import React, { Component } from 'react';
import clsx from 'clsx';
import '../../../resources/bootstrap.min.css';
import Footer from '../../header-footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import RegisterIcon from '@material-ui/icons/AddCircle'
import Message from '@material-ui/icons/Message';
import SearchByEmail from '../../SearchByEmail';
import { Link } from 'react-router-dom';
import firebase from '../../../config/firebase'
import swal from 'sweetalert';
import Swal from 'sweetalert2';

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: JSON.parse(sessionStorage.getItem('user')),
      disable: false,
      disable1: true,
      newPassword: '',
      confirm: ''
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.phoneNumber)
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  }

  logout() {
    sessionStorage.removeItem('user')
    window.location.reload()
  }

  updateData(e) {
    const { name, value } = e
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  updateServer() {
    const { user } = this.state
    firebase.database().ref('users').child(`${user['key']}`).update(user)
    swal({
      title: "successfully!",
      text: "Updated Successfully",
      icon: "success",
      // button: "OK",
  });
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
//C   logout() {
//     sessionStorage.clear('user')
//     sessionStorage.clear('search')
//     window.location.reload()
// }

deleteRecord(){
  const {displayUsers,user} = this.state;

  Swal.fire({
   title: 'Are you sure?',
   text: "You won't be able to revert this!",
   type: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then((result) => {
   if (result.value) {
    firebase.database().ref('users').child(`${user['key']}`).set({})
     Swal.fire(
       'Deleted!',
       'Your record has been deleted.',
       'success'
     )
     window.location.href='/';
   }
 })
 
  
  
 }



  render() {
    const { user, newPassword, confirm } = this.state
    return (
      <div>
        
        <nav className="navbar navbar-expand-lg navbar-light bck_black fixed-top">
         <IconButton style={{color:'white'}} color="inherit" title="Back" onClick={() => window.location.href = '/userDashboard'}>
                            <ArrowBack />   
                         </IconButton>
               <img style={{ width: '90px', height: '90px' }} src={require('../../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
               <div className="header_logo">
              
                   <div className="font_righteous header_logo_venue" style={{ color: 'white', fontSize: '30px' }}>Venue Club</div>
                   <div className="header_logo_title" style={{ color: 'white' }}>Design Your Perfect Event</div>
               </div>
                  <div className="dropdown" style={{marginLeft:980}}>
                    <button className="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown">Profile
                    <span className="caret"></span></button>
                    <ul className="ml dropdown-menu" style={{textAlign:'center', backgroundColor:' #383838',color:'#fff',float:'left'}}>
                      <br/>
                      <li>{user.fName}</li><hr style={{backgroundColor:'#ffffff'}}/>
                      
                      <li><a onClick={() => window.location.href='/userDashboard'}>Home</a></li>
                      <br/>
                      <li><a onClick={() => window.location.href='/user/chat'}>Message</a></li>
                      <br/>
                      <li><a onClick={() => window.location.href='/userDashboard/setting'}>Setting</a></li>
                      <br/><hr style={{backgroundColor:'#ffffff'}}/>
                      <li><a onClick={() => this.logout()}>Logout</a></li>
                      <br/>
                    </ul>
                  </div>
               
               </nav>

        <div>

          <div style={{ marginTop: '150px', marginBottom: '10px', marginLeft: '25%', marginRight: '25%', borderStyle: 'ridge', borderWidth: '1px' }}>
            <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '40px', marginBottom: '40px' }}> <h2>Edit contact information</h2><hr />
              <div className="form-row mt-3">
                <div className="col">
                  <label for="inputName" style={{float:'left'}}>First name</label>
                  <input type="text" name="fName" onChange={(e) => this.updateData(e.target)} value={user.fName} className="form-control" id="inputName" />
                </div>


                <div className="col">
                  <label for="inputName" style={{float:'left'}}>Last name</label>
                  <input type="text" name="lName" onChange={(e) => this.updateData(e.target)} value={user.lName} className="form-control" id="inputName" />
                </div>
              </div>

              <div className="form-row mt-2">

                <div className="col">
                  <label for="inputPrice" style={{float:'left'}}>Contact number</label>
                  <input type="number" name="phoneNumber" onChange={(e) => this.updateData(e.target)} value={user.phoneNumber} className="form-control" />
                </div>
              </div>

              <br />

              <div>
                <button type="submit" className="btn btn-success" disabled={this.state.disable} onClick={() => this.updateServer()} >Update</button>
              </div>

            </div></div>

          <div className="form-row mt-2" style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '40px' }}>
            <div className="col" style={{ marginRight: '20px', borderStyle: 'ridge', borderWidth: '1px' }}>
              <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '40px', marginBottom: '40px' }}>
                <h2>Change Password</h2>
                <hr />
                {/* <label for="inputPassword">Current password</label>
                <input type="password" className="form-control" /> */}

                <label for="inputPassword" style={{float:'left'}}>New password</label>
                <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={(e) => this.setState({ newPassword: e.target.value }, () => {
                  if (this.state.newPassword.length && this.state.confirm.length) {
                    this.setState({ disable1: false })
                  }
                  else {
                    this.setState({ disable1: true })
                  }
                })} />

                <label for="inputPassword" style={{float:'left'}}>Confirm password</label>
                <input type="password" className="form-control" name="confirm" value={confirm} onChange={(e) => this.setState({ confirm: e.target.value }, () => {
                  if (this.state.newPassword.length && this.state.confirm.length) {
                    this.setState({ disable1: false })
                  }
                  else {
                    this.setState({ disable1: true })
                  }
                })} />
                <br />

                <button type="submit" className="btn btn-success" disabled={this.state.disable1} onClick={() => this.changePassword()}>Change Password</button>


              </div>
            </div>

            <div className="col" style={{ borderStyle: 'ridge', borderWidth: '1px' }}>
              <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '40px', marginBottom: '40px' }}>
                <h2>Delete Account</h2>
                <hr />
                <br />

                <button type="submit" className="btn btn-danger" onClick={()=>this.deleteRecord()}>Delete Account</button><br /><br />
                <p>This action can not be undone</p>

              </div>
            </div>
          </div>

        </div><hr/>
        <SearchByEmail/>
        <Footer />
      </div>


    );
  }
}

export default Register;