import React, {Component} from 'react';
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
class Order extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(sessionStorage.getItem('user')),
      displayOrders:[],
    

    }}
    componentWillMount(){
      this.showData();
    }
    showData() {
      const { displayOrders,user } = this.state
      firebase.database().ref('users').child(`${user.uid}/recBooking`).on('child_added', (snapshot) => {
        snapshot.forEach((val) =>{

        
        var value = val.val()
        value['key'] = val.key
        displayOrders.push({
            key: val.key,
            name: value,
            hallName: value.hallName,
            pDate: value['date-time-picker'],
            status: value.status
         } )});
        this.setState({ displayOrders })
    })
  }
render(){
  const {user ,displayOrders} = this.state;

  return (
    <React.Fragment>
      <Title>Bookings Request</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Hall Name</TableCell>
            <TableCell>Date</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>

           {displayOrders.map((val,ind) => {
             return(
            <TableRow>
              <TableCell>{val.name}</TableCell>
              <TableCell>{val.hallName}</TableCell>
              <TableCell>{val.pDate}</TableCell>
           
            </TableRow>
            ) })} 
        </TableBody>
      </Table>
      
        <Link color="primary" style={{color:'green'}} onClick={()=> window.location.href='/OwnerDashboard/booking'}>
          See more orders
        </Link>
      
    </React.Fragment>
  );
}
}
export default Order