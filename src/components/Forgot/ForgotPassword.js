import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './../../resources/bootstrap.min.css';
import SearchIcon from '@material-ui/icons/Search';
import Modal from 'react-responsive-modal';
import Swal from 'sweetalert2';
import firebase from '../../config/firebase';
import axios from 'axios'
import SearchByEmail from '../SearchByEmail';
import Footer from '../header-footer/Footer';
import { Button } from '@material-ui/core';

class ForgotPassword extends Component {
  constructor(){
    super()
    this.state={
     progress : false ,
     open: true,
     femail:'' ,
     fques : '' ,
     fans : '' ,
     fpass : ''
    }
  }

  onOpenModal() {
    this.setState({ open: true });
    };
  
   onCloseModal = () => {
    this.setState({ open: false });
    };
  
    getQuestion(){
    const { femail , fques , fans , fpass } = this.state;
    var  email = document.getElementById('secemail').value;
      if(email.length<4){
        Swal.fire('Oops' , 'Enter Correct Email Address' , 'error')
      }else{
        firebase.database().ref("/users").orderByChild("email").equalTo(""+email).on("value", (snapshot)=> {
          if(snapshot.exists()){
          snapshot.forEach((childSnapshot)=> {
           var data = childSnapshot.val();
           console.log(data)
           document.getElementById('secques').innerHTML=data.secQuestion;
           this.setState({
             femail : data.email ,
             fques : data.secQuestion ,
             fans : data.secAnswer ,
             fpass : data.password
           })
          })
        }
          else{
            Swal.fire('Oops...', 'The email is not found in database', 'error')
          }
        })
      }
    }
  
   getAnswer(){
    const { femail , fques , fans , fpass } = this.state;
    var from = "admin@venueClub.com"
    var to = ""+femail;
    var subject = "Forget Password Request!"
    var message = "Your Venue Club Account Password is :"+fpass;
    var ans = document.getElementById('secans').value;
     console.log(ans , fans )
    if(fans.toLowerCase()==ans.toLowerCase()){
      // http://192.168.0.111:5000/send'
      //http://localhost:5000/send
      axios.post('http://venueclub786.herokuapp.com/send', {
        from , to , subject , message
      }).then((res) => {
        Swal.fire('Done' , 'Your Paasword has been sent to your email' )
        console.log(res.statusText);
      });
    }
    else{
      Swal.fire('Oops' , 'Your Answer was incorrect' , 'error')
    }
    Swal.fire('Done' , 'Your Paasword has been sent to your email' ).then((okay) => {
      if(okay){
        window.location.reload();
      }
    })
  
   }

  
    render() {
        const {open} = this.state;
        return (
            <div>

           {/* <Modal open={open} onClose={this.onCloseModal} center>
           <img style={{width: '25%', height: '25%' }} src={require('../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
        
          <div  style={{borderRadius:'10px' , padding:'20px'}}>
           <h4 style={{color:'	rgb(0,179,0)' , textAlign:'center'}} > <b> Forgot Password </b> </h4>
          <p style={{textAlign:'center'}}>  <b>" After Entering an Email Address , User Should Provide the Answer of Security Question in order to get Password on Provided Email Address."  </b> </p>
          <hr/>
           
        
           <input className="form-control" style={{marginBottom:'5px'}} id="secemail"  placeholder="Write Your Email Address Here" />
           <p style={{textAlign:'center'}}> < button  style={{margin:'2px auto'}} type="submit"  onClick={()=>this.getQuestion()} > Submit </ button> </p>
          
           <hr/>
           <p id="secques" className="form-control"> </p>
           <input className="form-control" style={{marginBottom:'5px'}} id="secans" placeholder="Write Your Answer Here" />
           
            <button  style={{margin:'2px auto'}} type="submit"  onClick={()=>this.getAnswer()} > Submit </button>
          </div>
        </Modal> */}


              <nav className="navbar navbar-expand-lg navbar-light bck_black fixed-top">
                      <IconButton style={{color:'white'}} color="inherit" title="Back" onClick={() => window.location.href = '/OwnerDashboard'}>
                       <ArrowBack />   
                       </IconButton>
               <img style={{ width: '90px', height: '90px' }} src={require('../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
               <div className="header_logo">
              
                   <div className="font_righteous header_logo_venue" style={{ color: 'white', fontSize: '30px' }}>Venue Club</div>
                   <div className="header_logo_title" style={{ color: 'white' }}>Design Your Perfect Event</div>
               </div>
               <Button style={{ marginLeft:'65%',color: 'white' }} onClick={() => window.location.href='/'}>Home</Button>
        
         
               </nav>

        <div  style={{textAlign:'center'}}>
            <img src={require('./../../resources/images/final.png')} style={{marginTop:'8%',width:'30%',height:'30%'}} onClick={()=> window.location.href='/'}/>
            <br/><br/>
            <input type="text" id="secemail" placeholder="Enter your email.." 
            style={{width:'40%',borderRadius:'5px',
            padding:'12px 20px',margin:'8px 0',display:'inline-block',
            border:'2px solid #ccc',boxSizing:'border-box',borderBlockStyle:'solid'}}
            /><br/>
             < button className="btn btn-success" style={{margin:'2px auto'}} type="submit"  onClick={()=>this.getQuestion()} > Submit </ button>
          
            
            &nbsp;
        <br/>
        <hr/>
           <p id="secques" className="form-control"  style={{width:'40%',borderRadius:'5px',
            padding:'12px 20px',margin:'8px 0',display:'inline-block',
            border:'2px solid #ccc',boxSizing:'border-box',borderBlockStyle:'solid'}} placeholder="Your Security Question"> </p>
            <br/>
           <input className="form-control"  style={{width:'40%',borderRadius:'5px',
            padding:'12px 20px',margin:'8px 0',display:'inline-block',
            border:'2px solid #ccc',boxSizing:'border-box',borderBlockStyle:'solid'}}
             id="secans" placeholder="Write Your Answer Here" />
           <br/>
            <button className="btn btn-success" style={{margin:'2px auto'}} type="submit"  onClick={()=>this.getAnswer()} > Submit </button>
        <br/><br/>
            
        </div>
        <hr/>
        <SearchByEmail/>
        <Footer/>
            </div>
        )
    }
}

export default ForgotPassword