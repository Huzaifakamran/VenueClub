import React , {Component} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import firebase from '../../../config/firebase';

// Generate Order Data

class Orders extends Component{
  constructor(){
    super()
    this.state={
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
    firebase.database().ref("/users").limitToFirst(5).on("value", (snapshot)=> {
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
render(){
  const {displayUsers} = this.state;
  return (
    <React.Fragment>
      <Title>Recent Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell align="right">User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {displayUsers.map((val) => {
             return(
            <TableRow>{val.fname}
              <TableCell>{val.email}</TableCell>
              <TableCell>{val.phone}</TableCell>
              <TableCell align="right">{val.userID}</TableCell>
              
            </TableRow>
             )  })} 
        </TableBody>
      </Table>
     <br/>
        <Link style={{color:'green'}} color="primary" onClick={()=> window.location.href='/adminDashboard/Users'}>
          See more users
        </Link>

    </React.Fragment>
  );
}}
export default Orders;