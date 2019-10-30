import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import Message from '@material-ui/icons/Message';
import Footer from '../../header-footer/Footer';
import SearchByEmail from '../../SearchByEmail';
import ArrowBack from '@material-ui/icons/ArrowBack';
import swal from "sweetalert";
import firebase from '../../../config/firebase';
import { Button } from '@material-ui/core';
function logout() {
  sessionStorage.removeItem('user')
  window.location.reload()
}
function sendMessage(){
  var Name=document.getElementById('defaultFormContactNameEx').value;
  var Email=document.getElementById('defaultFormContactEmailEx').value;
  var Subject=document.getElementById('defaultFormContactSubjectEx').value;
  var Message=document.getElementById('defaultFormContactMessageEx').value;

  if(Name === '' || Email === '' || Subject === '' || Message === ''){
      swal('Please fill All textfield(s)')
  }
else{


var skey = firebase.database().ref('Message/HallOwner').push();
  
var obj = {
   id:skey.key ,
   name : Name,
   email:Email,
   subject:Subject,
   message:Message
  }

  skey.set(obj)
  swal('Your Message send Successfully, we will contact you soon.').then(okay =>{
    if(okay){
      document.getElementById('defaultFormContactNameEx').value='';
      document.getElementById('defaultFormContactEmailEx').value='';
      document.getElementById('defaultFormContactSubjectEx').value='';
      document.getElementById('defaultFormContactMessageEx').value=''
    }
  })
 
}}

const FormPage = () => {
 
  return (
      <div>
           <AppBar style={{ background: '#3c3c3c' }} position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" >
            <IconButton color="inherit" title="Back" onClick={() => window.location.href = '/OwnerDashboard'}>
                <ArrowBack />   
           </IconButton>&nbsp;&nbsp;ContactUs Page
          </Typography>
            <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>
            <Button style={{ color: 'white' }} onClick={() => window.location.href='/ownerDashboard'}>Home</Button>
           
              <IconButton style={{ color: '#ffffff' }} title="Message" onClick={() => window.location.href = '/OwnerDashboard/chat'}>
                <Message />
              </IconButton>

              <IconButton color="inherit" title="Profile" >
                <UserIcon />
              </IconButton>
              <Button style={{ color: 'white' }} onClick={logout}>Logout</Button>
          
            </div>

          </Toolbar>
        </AppBar>

    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" style={{marginTop:'10%',marginLeft:'25%',marginRight:'25%'}}>
          
            <p className="h1 text-center mb-4 " style={{color:'black'}}>CONTACT US</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Your name
            </label>
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
            />
            <br />
            <label htmlFor="defaultFormContactEmailEx" className="grey-text">
              Your email
            </label>
            <input
              type="email"
              id="defaultFormContactEmailEx"
              className="form-control"
            />
            <br />
            <label
              htmlFor="defaultFormContactSubjectEx"
              className="grey-text"
            >
              Subject
            </label>
            <input
              type="text"
              id="defaultFormContactSubjectEx"
              className="form-control"
            />
            <br />
            <label
              htmlFor="defaultFormContactMessageEx"
              className="grey-text"
            >
              Your message
            </label>
            <textarea
              type="text"
              id="defaultFormContactMessageEx"
              className="form-control"
              rows="3"
            />
            <div className="text-center mt-4">
            <button type="submit" className="btn btn-success" onClick={sendMessage}>Send</button>
            </div>
          
         
        </MDBCol>
        
      </MDBRow>
     
    </MDBContainer>
    <hr/>
    <SearchByEmail/>
    <Footer/>
    </div>
    
  );
  
};

export default FormPage;