import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './../../resources/bootstrap.min.css';
import SearchIcon from '@material-ui/icons/Search';
import firebase from '../../config/firebase';

class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    sendEmail(){

        var actionCodeSettings = {
            // The URL to redirect to for sign-in completion. This is also the deep
            // link for mobile redirects. The domain (www.example.com) for this URL
            // must be whitelisted in the Firebase Console.
            url: 'https://www.example.com/finishSignUp?cartId=1234',
            iOS: {
              bundleId: 'com.example.ios'
            },
            android: {
              packageName: 'com.example.android',
              installApp: true,
              minimumVersion: '12'
            },
            // This must be true.
            handleCodeInApp: true
          };


        firebase.auth().sendSignInLinkToEmail('mohammadhuzaifa72@gmail.com', actionCodeSettings)
    .then(function(success) {
     console.log(success)
    })
    .catch(function(error) {
      console.log(error) 
    });
    }
    render() {
        
        return (
            <div>
                 <AppBar style={{ background: '#3c3c3c' }} position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" >
               <IconButton color="inherit" title="Back" onClick={() => window.location.href = '/userDashboard'}>
                  <ArrowBack />   
                </IconButton>&nbsp;&nbsp; Venue Club
            </Typography>
           
          </Toolbar>
        </AppBar>
        <div  style={{textAlign:'center'}}>
            <img src={require('./../../resources/images/final.png')} style={{marginTop:'8%',width:'30%',height:'30%'}} onClick={()=> window.location.href='/'}/>
            <br/><br/>
            <input type="text" id="lname" name="lastname" placeholder="Enter your email.." 
            style={{width:'40%',borderRadius:'5px',
            padding:'12px 20px',margin:'8px 0',display:'inline-block',
            border:'2px solid #ccc',boxSizing:'border-box',borderBlockStyle:'solid'}}
            />&nbsp;
        <br/>
            <button type="button" className="btn btn-success" style={{padding:'10px 10px'}} onClick={()=>window.location.href='/ForgotPassword/Security'} onClick={() => this.sendEmail()}>Search Email &nbsp;<SearchIcon/></button>
            
            
        </div>
            </div>
        )
    }
}

export default ForgotPassword