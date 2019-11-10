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
import '../../../resources/scrollbar.css';

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
                         <div className="dropdown" style={{marginLeft:930}}>
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
                  <li><a onClick={()=> this.logout()}>Logout</a></li>
                  <br/>
                </ul>
              </div>

                    </Toolbar>
                </AppBar>
                
                  <div className="form-row">
    { displayHalls.map((val, ind) =>{
         return(
            <div class="col-sm-4">
                 <div className="card-deck" style={{marginTop:'100px'}}>
            <div className="card">
            <div >
                <img style={{width:'100%',height:'300px'}} src={Picture[ind][0]}></img></div>
            
            <div className="card-body">
                <h5 className="card-title">{val.HallName}</h5>
                <div className="scrollbar square scrollbar-lady-lips thin" style={{overflowY:'scroll' , height:'120px'}}>
               
                <p className="card-text">{val.Desc}</p></div>
                </div>
                <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
            
            </div></div>
            
            )}
        )
    
}
</div>

{/* 
<div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                {displayHalls.map((v, i) => {
                                    return <Col span={8} key={i}>
                                        <Card
                                            style={{ marginTop: 20 }}
                                            title={v.hallName}
                                            hoverable
                                            // cover={<img alt="example" style={{ height: 260 }} src={`${v.picture[0]}`} />}
                                        >
                                            <Meta title={`VenueType: ${v.venueType}`} />
                                            <br />
                                            <h3>Name: {v.HallName}</h3>
                                            <h1>Capacity:{v.Capacity}</h1>
                                            <p>Address: {v.Address}</p>
                                            <p>Price: {v.Price}</p>
                                            <p>Description: {v.Desc}</p>
                                            <Btn type="primary" onClick={() => this.venueBooking(v)} block>
                                                Register
                                        </Btn>
                                            <Btn type="secondary" style={{ marginTop: 10 }} onClick={() => this.viewVenue(v)} block>
                                                View Venue
                                        </Btn>
                                        </Card>
                                    </Col>
                                })}
                            </Row>
                        </div> */}




</div>
        )
    }
}
export default RegisteredHalls