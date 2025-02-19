import React  , {Component } from "react";
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
import { Button } from '@material-ui/core';
import swal from "sweetalert";
import firebase from '../../../config/firebase';

class ContactUs extends Component {
  constructor(props) {
      super(props)

      this.state = {
        user: JSON.parse(sessionStorage.getItem('user')),
      }
  }


 logout() {
  sessionStorage.removeItem('user')
  window.location.reload()
}

sendMessage(){
  var Name=document.getElementById('defaultFormContactNameEx').value;
  var Email=document.getElementById('defaultFormContactEmailEx').value;
  var Subject=document.getElementById('defaultFormContactSubjectEx').value;
  var Message=document.getElementById('defaultFormContactMessageEx').value;

  if(Name === '' || Email === '' || Subject === '' || Message === ''){
      swal('Please fill All textfield(s)')
  }
else{


var skey = firebase.database().ref('Message/Users').push();
  
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


render(){
 const{user}=this.state;
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
            <button type="submit" className="btn btn-success" onClick={()=>this.sendMessage()}>Send</button>
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
}
export default ContactUs;