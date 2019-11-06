import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import firebase from '../../../config/firebase';
import UserIcon from '@material-ui/icons/AccountCircle';
import '../../../resources/bootstrap.min.css';
import Modal from 'react-responsive-modal';

class Bookings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name:'',
            email:'',
            phone:'',
            open: false,
            displayBookings:[],

           
        }
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };
    componentDidMount(){
        this.showData();
    }

     showData(){
        const {displayBookings} = this.state;
        firebase.database().ref("/allHallData").on("value", (snapshot)=> {
            snapshot.forEach((child)=> {
                child.forEach((childSnapshot)=> {
                    var obj={
                        id: childSnapshot.val().bookings.bookID,
                        hallName : childSnapshot.val().hallName,
                    }
                 
                displayBookings.push(obj)
               
                this.setState({displayBookings})
                

                })
            })
        }
      
    )
     }
    showBookings(i){
        const {name,email,phone,open}=this.state;
         firebase.database().ref("/users").orderByChild("uid").equalTo(""+i).on("value",(snapshot)=>{
           snapshot.forEach(childSnapshot=>{
            this.setState({open:true,
                name: childSnapshot.val().fName,
                email: childSnapshot.val().email,
                phone: childSnapshot.val().phoneNumber
            })
                
           
                // name: childSnapshot.val().fName,
                // email: childSnapshot.val().email,
                // phone: childSnapshot.val().phoneNumber
               
           
            // displayBookings.push(obj1);
            // this.setState({displayBookings})
           })
              
            
         })
         
    

}
      logout() {
        sessionStorage.removeItem('user')
        window.location.reload();
      }

    render() {
        const {displayBookings,name,email,phone,open} = this.state;
        return (
            <div>
                  <Modal open={open} onClose={this.onCloseModal} center>
                      <h2 className="font_righteous">USER RECORD</h2>
                      <hr/>
                           <br/> 
                           <h2><b>name:</b> {name}</h2>
                           <h2><b>email:</b> {email}</h2>
                           <h2><b>phone:</b> {phone}</h2>
                           <br/>
                           <button className="btn btn-success">Approve</button>&nbsp;&nbsp;&nbsp;
                           <button className="btn btn-danger">Reject</button>
                            </Modal>
                <AppBar style={{ background: '#3c3c3c'}} position="fixed">
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" >
                         <IconButton color="inherit" title="Back" onClick={() => window.location.href = '/adminDashboard'}>
                            <ArrowBack />   
                         </IconButton>&nbsp;&nbsp; Admin Dashboard || Bookings
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
                <h1 className="font_righteous" style={{textAlign:'center',color:'black',marginTop:'100px'}}>Recent Bookings</h1><br/>
                <div className="list-group">
                            <button type="button" className="list-group-item list-group-item-action" style={{backgroundColor:'gray' , color:'white' , fontStyle:'bold'}} >
                                <div className="form-row" style={{marginRight:'100px'}}>
                                <div className="col">
                                <p><b>Hall Name</b></p>
                                </div>
                                <div className="col" style={{marginRight:'50px'}}>
                                <p><b>Hall id</b></p>
                                </div>
                               
                                
                                </div>
                                
                            </button>
            
                            </div> 
                            <br/>
                  { displayBookings.map( (val , ind)=>{

                  return (

                            <div>
                             { val.id!=undefined &&
                                <div className="list-group">
                                <button type="button" className="list-group-item list-group-item-action" >
                                 <div className="form-row" style={{marginRight:'100px'}}>
                                <div className="col">
                                <p>{val.hallName}</p>
                                </div>
                                <div className="col" style={{marginRight:'50px'}}>
                                <p><b>{val.id}</b></p>
                                </div>
                                <button className="btn btn-success" onClick={()=>this.showBookings(val.id)}>View</button>
                               
                          
                                
                                </div> </button></div>
                            
                             }
                            </div>  
                  
                  )
                })    
            }
            </div>
        )
    }
}

export default Bookings