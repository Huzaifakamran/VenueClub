import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import firebase from '../../../config/firebase';
import '../../../resources/bootstrap.min.css';
import Card from './Card/index';

class RegisteredHalls extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayHalls:[],
            Picture : []
        }
    }
    componentDidMount(){
        this.showData();
      }
    showData(){
        const {displayHalls , Picture} = this.state;
        firebase.database().ref("/allHallData").on("value", (snapshot)=> {
            snapshot.forEach((child)=> {
                child.forEach((childSnapshot)=> {
            var obj = {
                HallName:childSnapshot.val().hallName,
                Capacity:childSnapshot.val().capacity,
                Address:childSnapshot.val().address,
                Desc:childSnapshot.val().description,
                Price:childSnapshot.val().price,
                // Picture:childSnapshot.val().picture,
                Key:childSnapshot.val().key,
            }
            displayHalls.push(obj)
            Picture.push(childSnapshot.val().picture)
            console.log('pic' , Picture)
            this.setState({displayHalls})
        })
            })
        })
    }
    logout() {
        sessionStorage.removeItem('user')
        window.location.reload()
      }

    render() {
        const { displayHalls , Picture} = this.state;
        return (
            <div>
                   <AppBar style={{ background: '#3c3c3c'}} position="fixed">
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" >
                         <IconButton color="inherit" title="Back" onClick={() => window.location.href = '/adminDashboard'}>
                            <ArrowBack />   
                         </IconButton>&nbsp;&nbsp; Admin Dashboard || Registered Halls
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

    { displayHalls.map((val, ind) =>{
         return(
 
         <div className="card-deck" style={{marginTop:'100px',width:'30%'}}>
            <div className="card">
             {  Picture[ind].map((val1 , ind1)=>{
                //   var a = ''+ind1;    
                 return(
                <img  src={Picture[ind][ind1]} style={{width:'100px' , height:'100px'}} />
                ) 
             })
            }
            <div className="card-body">
                <h5 className="card-title">{val.HallName}</h5>
                <p className="card-text">{val.Desc}</p>
                </div>
                <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
            
            </div>
            
            )}
        )
    
}
</div>
        )
    }
}
export default RegisteredHalls