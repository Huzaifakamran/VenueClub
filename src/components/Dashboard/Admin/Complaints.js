import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import UserIcon from '@material-ui/icons/AccountCircle';
import firebase from '../../../config/firebase.js';
import '../../../resources/bootstrap.min.css';
import img from '../../../resources/images/complaintsBackground.jpg';
import Footer from '../../header-footer/Footer';
import Swal from 'sweetalert2';

class Complaints extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayComplaints:[],
            displayUserComplaints:[]
            
           
        }
    }
    componentDidMount(){
        this.showData();
        this.showData1();
      }

    showData(){
        const {displayComplaints} = this.state;
        firebase.database().ref("/Message/HallOwner").on("value", (snapshot)=> {
          snapshot.forEach((childSnapshot)=> {
            var obj = {
             fname: childSnapshot.val().name,
             email : childSnapshot.val().email ,
             subject :childSnapshot.val().subject ,
             message : childSnapshot.val().message ,
             userID : childSnapshot.val().id,
            }
            
            displayComplaints.push(obj)
            this.setState({displayComplaints})
            
            //   childSnapshot.forEach((a)=>{
            //     console.log('2' , a.val()) 
            //   })
          })
        })
      }

      showData1(){
        const {displayUserComplaints} = this.state;
        firebase.database().ref("/Message/Users").on("value", (snapshot)=> {
          snapshot.forEach((childSnapshot)=> {
            var obj = {
             fname: childSnapshot.val().name,
             email : childSnapshot.val().email ,
             subject :childSnapshot.val().subject ,
             message : childSnapshot.val().message ,
             userID : childSnapshot.val().id,
            }
            
            displayUserComplaints.push(obj)
            this.setState({displayUserComplaints})
            
            //   childSnapshot.forEach((a)=>{
            //     console.log('2' , a.val()) 
            //   })
          })
        })
      }
      deleteHallOwnerRecord(i){
        const {displayComplaints} = this.state;
     
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
             firebase.database().ref(`/Message/HallOwner/${displayComplaints[i].userID}`).set({})
           Swal.fire(
             'Deleted!',
             'Your file has been deleted.',
             'success'
           )
           window.location.reload();
         }
       })
       
        
        
       }

       deleteUserRecord(i){
        const {displayUserComplaints} = this.state;
     
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
             firebase.database().ref(`/Message/Users/${displayUserComplaints[i].userID}`).set({})
           Swal.fire(
             'Deleted!',
             'Your file has been deleted.',
             'success'
           )
           window.location.reload();
         }
       })
       
        
        
       }
    
    logout() {
        sessionStorage.removeItem('user')
        window.location.reload()
      }
      
    
    render() {
      const {displayComplaints,displayUserComplaints} = this.state;
        return (
            <div>
                 <AppBar style={{ background: '#3c3c3c'}} position="fixed">
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" >
                         <IconButton color="inherit" title="Back" onClick={() => window.location.href = '/adminDashboard'}>
                            <ArrowBack />   
                         </IconButton>&nbsp;&nbsp; Admin Dashboard || Complaints
                         </Typography>
                        <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>
                            <Button style={{ color: 'white' }} onClick={() => window.location.href = '/adminDashboard'}>Home</Button>
                            <IconButton color="inherit" title="Profile">
                                <UserIcon />
                            </IconButton>
                            <Button style={{ color: 'white' }} onClick={() => this.logout()} >Logout</Button>

                        </div>

                    </Toolbar>
                </AppBar>

                <h1 className="font_righteous" style={{textAlign:'center',marginTop: '100px'}}>Complaints From HallOwner</h1>
                <br/>
                <div class="container" style={{backgroundImage:`url(${img})`}}>
                  <div class="row">
                    
               {

                 displayComplaints.map((val,ind) => {
                   return(
             
                   
                   
              <div class="col-md-4">
                  
                <div className="card mt-5" style={{width:'100%'}}>
                  <h5 className="card-header">{val.fname}</h5>
                  <div className="card-body">
                    <h5 className="card-title">{val.subject}</h5>
                    <p className="card-text">{val.message}</p>
                    <br/>
                    <div style={{textAlign:'center'}}>
                    <button className="btn btn-danger" onClick={(e)=>this.deleteHallOwnerRecord(ind)}>Delete</button> 
                   &nbsp; <button className="btn btn-success" >Message</button>
                    </div>
                </div>
                </div>
                </div>
                  
                    )
                  })
                }
                </div>
                
                </div>

                <h1 className="font_righteous" style={{textAlign:'center',marginTop: '100px'}}>Complaints From Users</h1>
                <br/>
                <div class="container" style={{backgroundImage:`url(${img})`}}>
                  <div class="row">

              {
                

                  this.showData1 && displayUserComplaints.map((val,ind) => {
                   
                return(

                
                
              <div class="col-md-4">
              
              <div className="card mt-5" style={{width:'100%'}}>
              <h5 className="card-header">{val.fname}</h5>
              <div className="card-body">
                <h5 className="card-title">{val.subject}</h5>
                <p className="card-text">{val.message}</p>
                <br/>
                <div style={{textAlign:'center'}}>
                <button className="btn btn-danger" onClick={(e)=>this.deleteUserRecord(ind)}>Delete</button>  
                &nbsp;<button className="btn btn-success" >Message</button>
                </div>
              </div>
              </div>
              </div>
              
                )
              })
              }
                </div></div>
                <br/><br/>
                <Footer/>
            </div>
        )
    }
}

export default Complaints