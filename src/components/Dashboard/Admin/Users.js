import React, { Component } from 'react'
import '../../../resources/bootstrap.min.css';
import firebase from '../../../config/firebase.js'
import Swal from 'sweetalert2';

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
        //   childSnapshot.forEach((a)=>{
        //     console.log('2' , a.val()) 
        //   })
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
    confirmButtonText: 'Yes, delete it!'
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
                <div className="list-group" >
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
                                <button className="btn btn-danger" onClick={(e)=>this.deleteRecord(ind)}>Delete</button>
                                <button className="btn btn-success ml-2">Message</button>
                                </div>
                                
                            </button>
            
                            </div>

                        )
                    })
                }



            </div>
        )
    }
}

export default Users