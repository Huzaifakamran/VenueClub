import React, { Component } from 'react'
import '../../../resources/bootstrap.min.css';
import firebase from '../../../config/firebase.js'
import Swal from 'sweetalert2';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Footer from '../../header-footer/Footer';

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayUsers:[]
        }
    }
    componentDidMount(){
    this.showData();
  }
  logout() {
    sessionStorage.removeItem('user')
    window.location.reload()
  }

  showData(){
    const {displayUsers} = this.state;
    firebase.database().ref("/users").on("value", (snapshot)=> {
      snapshot.forEach((childSnapshot)=> {
        var fullName = ""+childSnapshot.val().fName+" "+childSnapshot.val().lName;
        var obj = {
         fname: ""+fullName,
         email : childSnapshot.val().email ,
         phone :childSnapshot.val().phoneNumber ,
         userID : childSnapshot.val().uid ,
         accType : childSnapshot.val().accountType, 
        }
        
        displayUsers.push(obj)
        this.setState({displayUsers})
      })
    })
  }

  deleteRecord(i){
   const {displayUsers} = this.state;

   Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
        firebase.database().ref(`/users/${displayUsers[i].userID}`).set({})
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      window.location.reload();
    }
  })
  
   
   
  }

    render() {
        const {displayUsers} = this.state;
        return (
            <div>
                <AppBar style={{ background: '#3c3c3c'}} position="fixed">
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" >
                         <IconButton color="inherit" title="Back" onClick={() => window.location.href = '/adminDashboard'}>
                            <ArrowBack />   
                         </IconButton>&nbsp;&nbsp; Admin Dashboard || Users
                         </Typography>
                         <div className="dropdown" style={{marginLeft:980}}>
                <button className="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown">Profile
                <span className="caret"></span></button>
                <ul className="ml dropdown-menu" style={{textAlign:'center', backgroundColor:' #383838',color:'#fff',float:'left'}}>
                  <br/>
                  <li>Venue Club</li><hr style={{backgroundColor:'#ffffff'}}/>
                  
                  <li><a onClick={() => window.location.href='/AdminDashboard'}>Home</a></li>
                  <br/>
                  <li><a onClick={() => window.location.href='/adminDashboard/Users'}>Users</a></li>
                  <br/>
                  <li><a onClick={() => window.location.href='/adminDashboard/RegisteredHalls'}>Halls</a></li>
                  <br/>
                  <li><a onClick={() => window.location.href='/adminDashboard/Complaints'}>Complaints</a></li>
                  <br/>
                
                 
                 
                 <hr style={{backgroundColor:'#ffffff'}}/>
                  <li><a onClick={()=>this.logout()}>Logout</a></li>
                  <br/>
                </ul>
              </div>

                    </Toolbar>
                </AppBar>
           <h1 className="font_righteous" style={{textAlign:'center',color:'black',marginTop:'100px'}}>All Registered Users</h1><br/>
                <div className="list-group">
                            <button type="button" className="list-group-item list-group-item-action" style={{backgroundColor:'gray' , color:'white' , fontStyle:'bold'}} >
                                <div className="form-row" style={{marginRight:'100px'}}>
                                <div className="col">
                                <p><b>Name</b></p>
                                </div>
                                <div className="col" style={{marginRight:'50px'}}>
                                <p><b>Email</b></p>
                                </div>
                                <div className="col" >
                                <p><b>Phone</b></p>
                                </div>
                                <div className="col" style={{marginRight:'80px'}}>
                                <p><b>Account Type</b></p>
                                </div>
                                </div>
                                
                            </button>
            
                            </div>  

                {
                    displayUsers.map((val , ind )=>{

                        return(
                            
                            <div className="list-group">
                            <button type="button" className="list-group-item list-group-item-action" >
                                <div className="form-row">
                                <div className="col">
                                <p>{val.fname}</p>
                                </div>
                                <div className="col">
                                <p>{val.email}</p>
                                </div>
                                <div className="col">
                                <p>{val.phone}</p>
                                </div>
                                <div className="col">
                                <p>{val.accType}</p>
                                </div>
                                <button className="btn btn-danger" onClick={(e)=>this.deleteRecord(ind)}>Resolve</button>
                                </div>
                                
                            </button>
            
                            </div>

                        )
                    })
                }

<Footer/>

            </div>
        )
    }
}

export default Users