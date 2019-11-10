import React , {Component} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../User/Title';
import firebase from '../../../config/firebase';
import Swal from 'sweetalert2';

// Generate Order Data

class DashboardComplains extends Component{
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
        firebase.database().ref("/Message/HallOwner").limitToFirst(3).on("value", (snapshot)=> {
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
        firebase.database().ref("/Message/Users").limitToFirst(3).on("value", (snapshot)=> {
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
         confirmButtonText: 'Yes'
       }).then((result) => {
         if (result.value) {
             firebase.database().ref(`/Message/HallOwner/${displayComplaints[i].userID}`).set({})
           Swal.fire(
             'Deleted!',
             'Your Record has been deleted.',
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
         confirmButtonText: 'Yes'
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
render(){
  const {displayComplaints,displayUserComplaints} = this.state;
  return (
    <React.Fragment>
      <Title>Recent Complaints</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Message</TableCell>
            <TableCell align="right">User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {displayUserComplaints.map((val,ind) => {
             return(
            <TableRow>{val.fname}
              <TableCell>{val.email}</TableCell>
              <TableCell>{val.message}</TableCell>
              <TableCell align="right">{val.userID}</TableCell>
              <TableCell><button className="btn btn-danger" onClick={(e)=> this.deleteUserRecord(ind)}>Resolve</button></TableCell>
            </TableRow>
             )  })} 
                        <Title>From HallOwner: </Title>
                    

                {
                    displayComplaints.map((val,ind) => {
                        return(

                            <TableRow>{val.fname}
                            <TableCell>{val.email}</TableCell>
                            <TableCell>{val.message}</TableCell>
                            <TableCell align="right">{val.userID}</TableCell>
                            <TableCell><button className="btn btn-danger" onClick={(e)=> this.deleteHallOwnerRecord(ind)}>Resolve</button></TableCell>
                          </TableRow>
                        )

                    })

                }


        </TableBody>
      </Table>
     <br/>
        <Link style={{color:'green'}} color="primary" onClick={()=> window.location.href='/adminDashboard/Complaints'}>
          See more complaints
        </Link>

    </React.Fragment>
  );
}}
export default DashboardComplains;