import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './../../resources/bootstrap.min.css';
import SearchIcon from '@material-ui/icons/Search';

class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        
        return (
            <div>
                 <AppBar style={{ background: '#3c3c3c' }} position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" >
               <IconButton color="inherit" title="Back">
                  <ArrowBack onClick={() => window.location.href = '/userDashboard'} />   
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
            <button type="button" className="btn btn-success" style={{padding:'10px 10px'}} onClick={()=>window.location.href='/ForgotPassword/Security'}>Search Email &nbsp;<SearchIcon/></button>
            
            
        </div>
            </div>
        )
    }
}

export default ForgotPassword