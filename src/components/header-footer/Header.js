import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
// import $ from 'jquery';
import firebase from '../../config/firebase';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';
import Modal from 'react-responsive-modal';

class Header extends Component {


    constructor() {
        super();
        this.state = {
            randomNo:'',
            open: false,
            // DropdownIsVisible: false,
            showLogin: true,
            showSignup: false,
            drawerOpen: false,
            headerShow: false,
            email: '',
            password: '',
            disable: false,
            user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : false,
            obj: {
                fName: '',
                lName: '',
                email: '',
                phoneNumber: '',
                password: '',
                accountType: '',
                // paymentType: '',
                // numberType: '',
                secQuestion:'',
                secAnswer:''
            },
            obj2: {
                fName: '',
                lName: '',
                email: '',
                phoneNumber: '',
                password:'',
                accountType: '',
                // paymentType: '',
                // numberType: '',
                secQuestion:'',
                secAnswer:''
            }
        }
    }

    onOpenModal() {
        this.setState({ open: true });
        };
      
       onCloseModal = () => {
        this.setState({ open: false });
        };
      
        getQuestion(){
        const { femail , fques , fans , fpass } = this.state;
        var  email = document.getElementById('secemail').value;
          if(email.length<4){
            Swal.fire('Oops' , 'Enter Correct Email Address' , 'error')
          }else{
            firebase.database().ref("/users").orderByChild("email").equalTo(""+email).on("value", (snapshot)=> {
              if(snapshot.exists()){
              snapshot.forEach((childSnapshot)=> {
               var data = childSnapshot.val();
               console.log(data)
               document.getElementById('secques').innerHTML=data.secQuestion;
               this.setState({
                 femail : data.email ,
                 fques : data.secQuestion ,
                 fans : data.secAnswer ,
                 fpass : data.password
               })
              })
            }
              else{
                Swal.fire('Oops...', 'The email is not found in database', 'error')
              }
            })
          }
        }
      

    showSignup() {
        window.$('#exampleModalCenter').modal('hide');
        window.$('#signupModalCenter').modal('show');
    }

    showLogin() {
        window.$('#signupModalCenter').modal('hide');
        window.$('#exampleModalCenter').modal('show');
    }

    async login() {
        const { email, password } = this.state

        if (email === '' || password === '') {
            swal('Enter both textfield(s)')
        }
        else if (email != email || password != password) {
            swal('Please Enter correct Email or Password')
        }
        else {
            this.setState({
                disable: false
            })
            await firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    if(email == "venueclub786@gmail.com"){
                        swal({
                            title: "Login Successfully",
                            icon: "success"
                          }).then((okay) =>{
                              if(okay){
                                window.location.href ='/AdminDashboard'
                                sessionStorage.setItem('user', 'admin')
                              }
                          })
                        }
                        
                    else{

                    
                    console.log(res)
                    firebase.database().ref('users').child(`${res.user.uid}`).once('value', (value) => {
                        console.log(value.val())
                        var val1 = value.val()
                        val1['key'] = value.key
                        sessionStorage.setItem('user', JSON.stringify(val1))
                        swal({
                            title: "Login Successfully",
                            icon: "success"
                          }).then((okay) =>{
                              if(okay){
                                window.$('#exampleModalCenter').modal('hide');
                                console.log("Hello")
                               
                                 if (val1.accountType === "1") {
                                    window.location.href = '/userDashboard'
                                }
                                else {
                                    window.location.href = '/OwnerDashboard'
                                }
                            }
                        })
                       
                    })
                 }
                    this.setState({
                        email: '',
                        password: '',
                        disable: false
                    })
                })
                .catch((error) => {
                    swal('something went wrong' + error)

                });
        }
    }

    // showSecCodeModel(){
    //     const {randomNo,email}= this.state;
    //     window.$('#signupModalCenter').modal('hide');
    //     this.setState({open:true});
    //       this.setState({ randomNo:Math.round(1+Math.random()* 1000000)});
    //     var from = "admin@venueClub.com"
    //  var to = ""+email;
    //  var subject = "Account Verification Request"
    //  var message = "Your Venue Club verification Code is :"+randomNo;
    //  var ans = document.getElementById('secCode').value;
    //   console.log(ans , randomNo)
    //  if(randomNo ==ans ){
    //    // http://192.168.0.111:5000/send'
    //    //http://localhost:5000/send
    //    axios.post('http://venueclub786.herokuapp.com/send', {
    //      from , to , subject , message
    //    }).then((res) => {
    //      Swal.fire('Done' , 'Your Account has been created' )
    //      console.log(res.statusText);
    //    });
    //  }
    //  else{
    //    Swal.fire('Oops' , 'Your Answer was incorrect' , 'error')
    //  }
    //  Swal.fire('Done' , 'Your Account has been created' ).then((okay) => {
    //    if(okay){
    //        window.location.reload();
    // }
    //  })}

    signUp() {
        const { obj } = this.state;
      
        // window.location.reload();
        if (obj.email == '' || obj.password == '' || obj.fName == '' || obj.lName == '' || obj.email == '' || obj.password == '' || obj.phoneNumber == '' || obj.confirmPassword == '' || obj.accountType == '' || obj.secQuestion == '' ||obj.secAnswer == '') {
            swal('Fill All textfield(s)')
        }else if(obj.email.length < 5){
            swal('Enter valid email')
        }
        else if(obj.phoneNumber.length < 11 || obj.phoneNumber.length > 11){
            swal('Enter valid phone number')
        }
        else if(obj.password != obj.confirmPassword){
            swal("Oops!", "Password does not matched!", "error");
        }
        else if (obj.accountType == 2) {
            // if (obj.paymentType == '' || obj.numberType == '') {
            //     swal('Fill both textfield(s)')
            // }
            // else if(obj.numberType.length < 11 || obj.numberType.length > 11){
            //     swal('Enter valid account number')
            // }
            // else {
                this.setState({
                    disable: true
                })
                firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then((res) => {
                    obj['uid'] = res.user.uid
                     
                    
                    var obj1 = {
                        fName: '',
                        lName: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        accountType: '',
                        // paymentType: '',
                        // numberType: '',
                        secQuestion:'',
                        secAnswer:''
                    }
                    console.log(res)
                    console.log("***")
                    firebase.database().ref('users').child(`${res.user.uid}/`).set(obj)
                        .then(() => {
                            sessionStorage.setItem('user', JSON.stringify(obj))
                            this.setState({ obj: obj1, disable: false })
                            swal({
                                title: "Signup Successfully",
                                icon: "success"
                              }).then((okay) =>{
                                  if(okay){
                            window.$('#signupModalCenter').modal('hide');
                            window.location.href = '/OwnerDashboard'
                        
                        }})
                        })
                })
                    .catch((error) => {
                        swal('something went wrong' + error);
                    });
            // }
        }
        else {
            this.setState({
                disable: true
            })
            firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then((res) => {
                obj['uid'] = res.user.uid
                
                var obj1 = {
                    fName: '',
                    lName: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    
                    accountType: '',
                    // paymentType: '',
                    // numberType: '',
                    secQuestion:'',
                    secAnswer:''
                }
                console.log(res)
                console.log("***")
                firebase.database().ref('users').child(`${res.user.uid}/`).set(obj)
                    .then(() => {
                        sessionStorage.setItem('user', JSON.stringify(obj))
                        this.setState({ obj: obj1, disable: false })
                        
                        swal({
                            title: "Signup Successfully",
                            icon: "success"
                          }).then((okay) =>{
                              if(okay){
                                window.$('#signupModalCenter').modal('hide');
                                window.location.href = '/userDashboard'
                              }
                            })
                       
                    })

            })
                .catch((error) => {
                    swal('something went wrong' + error);
                });
        }
       
     

       
    }

    scrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -150
        })
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 0) {
            this.setState({
                headerShow: true
            })
        } else {
            this.setState({
                headerShow: false
            })
        }
    }

    updateData(e) {
        const { name, value } = e;
        // if (value == 2 && name === "accountType") {
        //     this.setState({ DropdownIsVisible: true })
        // }
        // else if (value == 1 && name === "accountType") {
        //     this.setState({ DropdownIsVisible: false })
        // }

        this.setState({
            obj: {
                ...this.state.obj,
                [name]: value
            },

        })
    }
    updateData1(e) {
        const { name, value } = e;
        // if (value == 2 && name === "accountType") {
        //     this.setState({ DropdownIsVisible: true })
        // }
        // else if (value == 1 && name === "accountType") {
        //     this.setState({ DropdownIsVisible: false })
        // }

        this.setState({
            obj2: {
                ...this.state.obj2,
                [name]: value
            },

        })
    }
    updateLogin() {
        const { obj2 } = this.state

        if (obj2.email == '' || obj2.email == '' || obj2.phoneNumber == '' || obj2.accountType == '' || obj2.secQuestion == '' || obj2.secAnswer == '') {
            swal('Fill All textfield(s)')
        }
        else if (obj2.accountType == 2) {
            // if (obj2.paymentType == '' || obj2.numberType == '') {
            //     swal('Fill')
            // }
            // else {
                this.setState({
                    disable: true
                })
                var obj1 = {
                    fName: '',
                    lName: '',
                    email: '',
                    phoneNumber: '',
                    password:'',
                    accountType: '',
                    // paymentType: '',
                    // numberType: '',
                    secQuestion:'',
                    secAnswer:''
                }
                firebase.database().ref('users').child(`${obj2.uid}/`).set(obj2)
                    .then(() => {
                        sessionStorage.setItem('user', JSON.stringify(obj2))
                        this.setState({ obj2: obj1, disable: false })
                        swal({
                            title: "Signup Successfully",
                            icon: "success"
                          }).then((okay) =>{
                              if(okay){
                                window.$('#AdditionalInfo').modal('hide');
                                window.location.href = '/OwnerDashboard'
                              }})
                      
                    })
            // }
        }
        else {
            this.setState({
                disable: true
            })
            var obj1 = {
                fName: '',
                lName: '',
                email: '',
                phoneNumber: '',
                password:'',
                accountType: '',
                // paymentType: '',
                // numberType: '',
                secQuestion:'',
                secAnswer:''
            }
            firebase.database().ref('users').child(`${obj2.uid}/`).set(obj2)
                .then(() => {
                    sessionStorage.setItem('user', JSON.stringify(obj2))
                    this.setState({ obj2: obj1, disable: false })
                    swal({
                        title: "Signup Successfully",
                        icon: "success"
                      }).then((okay) =>{
                          if(okay){
                            window.$('#AdditionalInfo').modal('hide');
                            window.location.href = '/userDashboard'
                          }})
                 
                })
        }
    }

    logout() {
        sessionStorage.removeItem('user')
        window.location.reload()
    }

    facebookLogin() {
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                    this.setState({
                        obj2: {
                            fName: result.additionalUserInfo.profile.first_name,
                            lName: result.additionalUserInfo.profile.last_name,
                            email: result.user.email,
                            uid: result.user.uid,
                        },
                        email: result.user.email,
                        phoneNumber: result.user.phoneNumber
                    }, () => {
                        window.$('#exampleModalCenter').modal('hide');
                        window.$('#AdditionalInfo').modal('show');
                    })
                }
                else {
                    firebase.database().ref('users').child(`${result.user.uid}`).once('value', (value) => {
                        var val1 = value.val()
                        val1['key'] = value.key
                        sessionStorage.setItem('user', JSON.stringify(val1))
                        swal({
                            title: "login Successfully",
                            icon: "success"
                          }).then((okay) =>{
                              if(okay){
                                window.$('#exampleModalCenter').modal('hide');
                                if (val1.accountType === "1") {
                                    window.location.href = '/userDashboard'
                                }
                                else {
                                    window.location.href = '/OwnerDashboard'
                                }
                              }})
                      
                    })
                }
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage)
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    googleLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                    this.setState({
                        obj2: {
                            fName: result.additionalUserInfo.profile.given_name,
                            lName: result.additionalUserInfo.profile.family_name,
                            email: result.user.email,
                            uid: result.user.uid,
                        },
                        email: result.user.email,
                        phoneNumber: result.user.phoneNumber
                    }, () => {
                        window.$('#exampleModalCenter').modal('hide');
                        window.$('#AdditionalInfo').modal('show');
                    })
                }
                else {
                    firebase.database().ref('users').child(`${result.user.uid}`).once('value', (value) => {
                        var val1 = value.val()
                        val1['key'] = value.key
                        sessionStorage.setItem('user', JSON.stringify(val1))
                        swal({
                            title: "login Successfully",
                            icon: "success"
                          }).then((okay) =>{
                              if(okay){
                                window.$('#exampleModalCenter').modal('hide');
                                if (val1.accountType === "1") {
                                    window.location.href = '/userDashboard'
                                }
                                else {
                                    window.location.href = '/OwnerDashboard'
                                }
                              }})
                     
                    })
                }
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage)
                var email = error.email;
                var credential = error.credential;
            });
    }

    render() {
        const { obj, email, password,obj2 ,phoneNumber,open} = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bck_black fixed-top"

                    style={{
                        backgroundColor: this.state.headerShow ? '#2f2f2f' : 'transparent',
                        boxShadow: 'none'
                    }}>

                    <img style={{ width: '90px', height: '90px' }} src={require('../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
                    <div className="header_logo">
                        <div className="font_righteous header_logo_venue" style={{ color: 'white', fontSize: '30px' }}>Venue Club</div>
                        <div className="header_logo_title" style={{ color: 'white' }}>Design Your Perfect Event</div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav head_ul" style={{ marginLeft: '25%' }}>
                            <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.scrollToElement('Home')}>HOME</button> </li>
                            <li>  <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.scrollToElement('Categories')}>CATEGORIES</button></li>
                            <li>   <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.scrollToElement('AboutUs')}>ABOUT US</button></li>
                            <li>  <Link to="/PrivacyPolicy">   <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>PRIVACY POLICY</button></Link></li>
                            <li>  <Link to="/TermsAndCondition">   <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>TERMS & CONDITION</button></Link></li>
                            {/* <li>  <Link to="/PaymentMethod">   <button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>PAYMENT METHOD</button></Link></li>
                           */}
                            {!this.state.user ? <li>  <button type="button" style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} data-toggle="modal" data-target="#exampleModalCenter" >LOGIN / SIGNUP</button></li> :
                                <li>  <button type="button" style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} onClick={() => this.logout()} >LOGOUT</button></li>}
                                {/* <li>  <Link to="/AdminDashboard"><button style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }} >Admin</button></Link></li> */}

                        </ul>
                    </div>
                </nav>

                <div>

                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">



                                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                                        <h5 style={{ color: 'black' }} className="modal-title" id="exampleModalLongTitle">Welcome to login page</h5>

                                    </div>

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>


                                <div className="modal-body" style={{ textAlign: 'center' }}>
                                    <img style={{ width: '100px', height: '100px' }} src={require('../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
                                    <br /><br />
                                    <FacebookLoginButton onClick={() => this.facebookLogin()} />
                                    <GoogleLoginButton onClick={() => this.googleLogin()} />

                                    <br />

                                    <p style={{ color: 'black' }}>OR</p>

                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => this.setState({ email: e.target.value })} aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                                    </div>


                                    <div className="d-flex justify-content-end">
                                        <a style={{ color: 'blue' }} onClick={() => window.location.href = '/ForgotPassword'}>forgot password?</a>
                                    </div>

                                </div>

                                <div className="modal-footer d-flex justify-content-center" style={{ textAlign: 'center' }}>
                                    <div>
                                        <br />
                                        <button type="button" disabled={this.state.disable} className="btn btn-success" onClick={() => this.login()}>Login</button>
                                        <br />
                                        <br />
                                        <p style={{ color: 'black' }}>Don't have an account? <a style={{ color: 'blue' }} onClick={() => { this.showSignup() }} data-toggle="modal" >Sign up</a>

                                      
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="modal fade" style={{ overflow: 'scroll' }} id="signupModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">



                                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                                        <h5 style={{ color: 'black' }} className="modal-title" id="exampleModalLongTitle">Signup page</h5>

                                    </div>

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>


                                <div className="modal-body" style={{ textAlign: 'center' }}>
                                <img style={{ width: '100px', height: '100px' }} src={require('../../resources/images/final.png')} />

                                    <br /><br />

                                    <div className="form-group">
                                        <input className="form-control" id="f_name" name="fName" value={obj.fName} onChange={(e) => this.updateData(e.target)} aria-describedby="emailHelp" placeholder="First name" />
                                    </div>

                                    <div className="form-group">
                                        <input name="lName" value={obj.lName} onChange={(e) => this.updateData(e.target)} className="form-control" id="l_name" aria-describedby="emailHelp" placeholder="Last name" />
                                    </div>

                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" value={obj.email} onChange={(e) => this.updateData(e.target)} id="email1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <input type="number" name="phoneNumber" value={obj.phoneNumber} onChange={(e) => this.updateData(e.target)} className="form-control" id="phone" placeholder="Phone #" />
                                    </div>

                                    <div className="form-group">
                                        <input type="password" name="password" value={obj.password} onChange={(e) => this.updateData(e.target)} className="form-control" id="password1" placeholder="Password" />
                                    </div>

                                    <div className="form-group">
                                        <input type="password" name="confirmPassword" value={obj.confirmPassword} onChange={(e) => this.updateData(e.target)} className="form-control" id="confirm_pwd" placeholder="Confirm Password" />
                                    </div>
                                        
                                    <div className="form-row">
                                        <div className="col">
                                        <input type="text" name="secQuestion" value={obj.secQuestion} onChange={(e) => this.updateData(e.target)} className="form-control" id="question" placeholder="Write your security question" />
                                        </div>

                                        <div className="col">
                                            <input type="text" name="secAnswer" className="form-control" value={obj.secAnswer} onChange={(e) => this.updateData(e.target)} id="answer" placeholder="Answer" />
                                            <span>Remember the answer it will help u when u forgot your password</span>

                                        </div>
                                       
                                    </div><br/>

                                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="accountType" value={obj.accountType} onChange={(e) => this.updateData(e.target)}>
                                        <option selected>Select Account Type...</option>
                                        <option value="1">User</option>
                                        <option value="2">Hall Owner</option>
                                    </select>
                                    <br /><br />
                                    {/* {DropdownIsVisible &&
                                        <div>
                                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="paymentType" value={obj.paymentType} onChange={(e) => this.updateData(e.target)}>
                                                <option selected>Select Payment Method...</option>
                                                <option value="3">Jazz Cash</option>
                                                <option value="4">Easy Paisa</option>
                                            </select><br /><br />
                                            <div className="form-group">
                                                <input type="number" name="numberType" value={obj.numberType} onChange={(e) => this.updateData(e.target)} className="form-control" id="numberType1" placeholder="Enter Your Account phone number (0300xxxxxxx)" />
                                            </div>
                                        </div>

                                    } */}

                                </div>

                                <div className="modal-footer d-flex justify-content-center" style={{ textAlign: 'center' }}>
                                    <br />
                                    <div>

                                        <p style={{ color: 'grey', fontStyle: 'italic' }}>
                                            By signing up, I agree to Venue Club's <a style={{ color: 'blue', fontWeight: 'bold', textDecorationLine: 'underline' }} onClick={() => window.open('/TermsAndCondition')}>Terms & Condition</a> <br /> and <a style={{ color: 'blue', fontWeight: 'bold', textDecorationLine: 'underline' }} onClick={() => window.open('/PrivacyPolicy')}>Privacy Policy</a>.
                                        </p>

                                        <br />

                                        <button disabled={this.state.disable} type="button" className="btn btn-success" onClick={() => this.signUp()}>Sign Up</button>
                                        <Modal open={open} onClose={this.onCloseModal} center>
                                                <img style={{width: '25%', height: '25%' }} src={require('../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
                                                
                                                <div  style={{borderRadius:'10px' , padding:'20px'}}>
                                                <h4 style={{color:'	rgb(0,179,0)' , textAlign:'center'}} > <b> Enter Security Code.. </b> </h4>
                                                <p style={{textAlign:'center'}}>  <b>" After SignUp , User Should Provide the Security Code in order to get access on Provided Email Address."  </b> </p>
                                                <hr/>
                                                
                                                
                                                <input className="form-control" style={{marginBottom:'5px'}} id="secCode"  placeholder="Write Your Security Code Here" />
                                                <p style={{textAlign:'center'}}> < button  style={{margin:'2px auto'}} type="submit"  onClick={()=>this.showSecCodeModel()} > Submit </ button> </p>
                                                
                                                <hr/>
                                                {/* <p id="secques" className="form-control"> </p>
                                                <input className="form-control" style={{marginBottom:'5px'}} id="secans" placeholder="Write Your Answer Here" />
                                                
                                                    <button  style={{margin:'2px auto'}} type="submit"  onClick={()=>this.getAnswer()} > Submit </button> */}
                                                </div>
                                                </Modal>
                                        <br />
                                        <br />
                                        <p style={{ color: 'black' }}>Already have an account? <a style={{ color: 'blue' }} onClick={() => { this.showLogin() }} data-toggle="modal" >Login</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" style={{ overflow: 'scroll' }} id="AdditionalInfo" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">



                                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                                        <h5 style={{ color: 'black' }} className="modal-title" id="exampleModalLongTitle1">Additional Info</h5>
                                    </div>

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>


                                <div className="modal-body" style={{ textAlign: 'center' }}>

                                    <br />

                                    {!email && <div className="form-group">
                                        <input type="email" className="form-control" name="email" value={obj2.email} onChange={(e) => this.updateData1(e.target)} aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>}

                                    {!phoneNumber && <div className="form-group">
                                        <input type="number" name="phoneNumber" value={obj2.phoneNumber} onChange={(e) => this.updateData1(e.target)} className="form-control" placeholder="Phone #" />
                                    </div>}

                                    <select className="custom-select mr-sm-2" name="accountType" value={obj2.accountType} onChange={(e) => this.updateData1(e.target)}>
                                        <option selected>Select Account Type...</option>
                                        <option value="1">User</option>
                                        <option value="2">Hall Owner</option>
                                    </select>
                                    <br /><br />
                                    {/* {DropdownIsVisible &&
                                        <div>
                                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="paymentType" value={obj2.paymentType} onChange={(e) => this.updateData1(e.target)}>
                                                <option selected>Select Payment Method...</option>
                                                <option value="3">Jazz Cash</option>
                                                <option value="4">Easy Paisa</option>
                                            </select><br /><br />
                                            <div className="form-group">
                                                <input type="number" name="numberType" value={obj2.numberType} onChange={(e) => this.updateData1(e.target)} className="form-control" id="numberType1" placeholder="Enter Your Account phone number (0300xxxxxxx)" />
                                            </div>
                                        </div>

                                    } */}

                                </div>
                                <div className="modal-footer d-flex justify-content-center" style={{ textAlign: 'center' }}>
                                    <br />
                                    <div>
                                        <button disabled={this.state.disable} type="button" className="btn btn-success" onClick={() => this.updateLogin()}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default Header;