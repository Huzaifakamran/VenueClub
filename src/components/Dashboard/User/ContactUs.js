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



const FormPage = () => {
 
  return (
      <div>
           <AppBar style={{ background: '#3c3c3c' }} position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" >
            <IconButton color="inherit" title="Back">
                            <ArrowBack onClick={() => window.location.href = '/userDashboard'} />   
                            </IconButton>&nbsp;&nbsp;ContactUs Page
          </Typography>
            <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>

              <IconButton style={{ color: '#ffffff' }} title="Message" onClick={() => window.location.href = '/user/chat'}>
                <Message />
              </IconButton>

              <IconButton color="inherit" title="Profile" >
                <UserIcon />
              </IconButton>
              
            </div>

          </Toolbar>
        </AppBar>

    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" style={{marginTop:'10%',marginLeft:'25%',marginRight:'25%'}}>
          <form >
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
            <button type="submit" className="btn btn-success">Send</button>
            </div>
          </form>
         
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