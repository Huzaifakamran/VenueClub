import React, { Component } from 'react';
import clsx from 'clsx';
import '../../resources/bootstrap.min.css'
import Footer from '../header-footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import RegisterIcon from '@material-ui/icons/AddCircle'
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Element } from 'react-scroll';
import Carrousel from '../featured/Carrousel'
import Search from '../featured/Search';
import 'antd/dist/antd.css';
import firebase from '../../config/firebase'
import { Card, Col, Row, Skeleton, Button as Btn, Form, Modal, Input, DatePicker } from 'antd';
import swal from 'sweetalert';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import People from '@material-ui/icons/People';
import SearchByEmail from '../SearchByEmail';
import '../../resources/scrollbar.css';

const { Meta } = Card




class SearchResult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: sessionStorage.getItem('search') ? JSON.parse(sessionStorage.getItem('search')) : false,
            visible: false,
            confirmLoading: false,
            showSignup:false,
            allHallData: [],
            selectedHall: '',
            email: '',
            password: '',
             phoneNumber: '',   //C
            disable: false,
            user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : false,
            obj: {
                fName: '',
                lName: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
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
                accountType: '',
                // paymentType: '',
                // numberType: '',
                secQuestion:'',
                secAnswer:''
            }                //C
        }
    }


    componentWillMount() {
        const { search, allHallData } = this.state
        console.log('user', search)
        if (search) {
            firebase.database().ref('allHallData').on('child_added', (val) => {
                firebase.database().ref('allHallData').child(`${val.key}`).on('child_added', (val1) => {
                    var value = val1.val()
                    if (value.hallName.toLowerCase().indexOf(search.vName.toLowerCase()) !== -1 && value.venueLocation.toLowerCase().indexOf(search.vLocation.toLowerCase()) !== -1 && value.venueType.toLowerCase().indexOf(search.vType.toLowerCase()) !== -1) {
                        value['userUid'] = val.key
                        value['key'] = val1.key
                        allHallData.push(value)
                        this.setState({ allHallData })
                    }
                })
            })
        }
        else {
            firebase.database().ref('allHallData').on('child_added', (val) => {
                firebase.database().ref('allHallData').child(`${val.key}`).on('child_added', (val1) => {
                    var value = val1.val()
                    value['userUid'] = val.key
                    value['key'] = val1.key
                    allHallData.push(value)
                    this.setState({ allHallData })
                })
            })
        }
    }

    componentDidMount() {
        sessionStorage.removeItem('search')
    }

    updateData(e) {
        const { name, value } = e
        //  if (value == 2 && name === "accountType") {    //C
        //     this.setState({ DropdownIsVisible: true })
        // }
        // else if (value == 1 && name === "accountType") {
        //     this.setState({ DropdownIsVisible: false })
        // }                                               //C
        this.setState({
            obj: {
                ...this.state.obj,
                [name]: value
            },
        })
    }

     updateData1(e) {                   //C
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
}                                        //C

    handleSubmit = (e) => {
        const { selectedHall, user } = this.state
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            fieldsValue['date-time-picker'] = fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss')
            fieldsValue['hallData'] = selectedHall
            fieldsValue['customerUid'] = user.uid
            fieldsValue['advance'] = selectedHall.price / 10
            fieldsValue['status'] = 'pending'

            firebase.database().ref('users').child(`${user.uid}/sentBooking/`).push(fieldsValue)
                .then((snap) => {
                    this.setState({ visible: false })
                    swal({
                        title: "successfully!",
                        text: "Send the Booking Request",
                        icon: "success",
                        // button: "OK",
                    });
                    this.props.form.resetFields()
                    firebase.database().ref('users').child(`${selectedHall.userUid}/recBooking/${snap.key}`).set(fieldsValue)
                })
        })
    }

    logout() {
        sessionStorage.clear('user')
        sessionStorage.clear('search')
        window.location.reload()
    }

    venueBooking(v) {                       //C
        const { user } = this.state
        if (user) {
            this.setState({ visible: true, selectedHall: v }, () => {
                this.props.form.setFieldsValue({
                    hallName: v.hallName,
                    name: user.fName
                })
            })
        }
        else {
            this.setState({ selectedHall: v }, () => {
                this.props.form.setFieldsValue({
                    hallName: v.hallName
                })
                this.showLogin()
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
                        swal('login successfull')
                        window.location.href ='/AdminDashboard'
                        sessionStorage.setItem('user', 'admin')
                    }
                    else{

                    
                    console.log(res)
                    firebase.database().ref('users').child(`${res.user.uid}`).once('value', (value) => {
                        console.log(value.val())
                        var val1 = value.val()
                        val1['key'] = value.key
                        sessionStorage.setItem('user', JSON.stringify(val1))
                        swal('login successfull')
                        window.$('#exampleModalCenter').modal('hide');
                        console.log("Hello")
                       
                         if (val1.accountType === "2") {
                            window.location.href = '/OwnerDashboard'
                        }
                        else if (this.state.selectedHall) {
                            this.props.form.setFieldsValue({
                                name: val1.fName
                            })

                            this.setState({
                                user: val1,
                                visible: true
                            })
                        }
                        else {
                            this.setState({
                                user: val1,
                            })
                        }
                    })
                
                    this.setState({
                        email: '',
                        password: '',
                        disable: false
                    })
                                }                })
                .catch((error) => {
                    swal("Oops!", "Something went wrong!", error);

                });
        }
    }


    signUp() {
        const { obj } = this.state

        if (obj.email == '' || obj.password == '' || obj.fName == '' || obj.lName == '' || obj.email == '' || obj.password == '' || obj.phoneNumber == '' || obj.confirmPassword == '' || obj.accountType == '' || obj.secQuestion == '' ||obj.secAnswer == '') {
            swal('Fill All textfield(s)')
        }
        else if(obj.email.length < 5){
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
                    delete obj.password
                    delete obj.confirmPassword
                    var obj1 = {
                        fName: '',
                        lName: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: '',
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
                                title: "successfully!",
                                text: "Signup Successfully",
                                icon: "success",
                                // button: "OK",
                            });
                            window.$('#signupModalCenter').modal('hide');
                            window.location.href = '/OwnerDashboard'
                        })
                })
                    .catch((error) => {
                        swal('something went wrong' + error);
                    });
            
        }
        else {
            this.setState({
                disable: true
            })
            firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then((res) => {
                obj['uid'] = res.user.uid
                delete obj.password
                delete obj.confirmPassword
                var obj1 = {
                    fName: '',
                    lName: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
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
                        swal('Signup successfull');
                    window.$('#signupModalCenter').modal('hide');
                    if (this.state.selectedHall) {
                        this.props.form.setFieldsValue({
                            name: obj.fName
                        })

                        this.setState({
                            user: obj,
                            visible: true,
                            disable: false
                        })
                    }
                    else {
                        this.setState({
                            user: obj,
                            disable: false
                        })
                    }
                })   //C
            })
                .catch((error) => {
                    swal('something went wrong' + error);
                });
        }
    }

    viewVenue(v) {
        sessionStorage.setItem('view', JSON.stringify(v))
        window.location.href = '/viewVenue'
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
                        swal('login successfull')
                        window.$('#exampleModalCenter').modal('hide');
                        if (val1.accountType === "2") {
                            window.location.href = '/OwnerDashboard'
                        }
                        else if (this.state.selectedHall) {
                            this.props.form.setFieldsValue({
                                name: val1.fName
                            })

                            this.setState({
                                user: val1,
                                visible: true,
                                disable: false
                            })
                        }
                        else {
                            this.setState({
                                user: val1,
                                disable: false
                            })
                        }
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
                        swal('login successfull')
                        window.$('#exampleModalCenter').modal('hide');
                        if (val1.accountType === "2") {
                            window.location.href = '/OwnerDashboard'
                        }
                        else if (this.state.selectedHall) {
                            this.props.form.setFieldsValue({
                                name: val1.fName
                            })

                            this.setState({
                                user: val1,
                                visible: true,
                                disable: false
                            })
                        }
                        else {
                            this.setState({
                                user: val1,
                                disable: false
                            })
                        }
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
                        swal('Signup successfull');
                        window.$('#AdditionalInfo').modal('hide');
                        window.location.href = '/OwnerDashboard'
                    })
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
                    swal('Signup successfull');
                    window.$('#AdditionalInfo').modal('hide');
                    this.props.form.setFieldsValue({
                        name: obj2.fName
                    })

                    this.setState({
                        user: obj2,
                        visible: true
                    })
                })
        }
    }

  

    render() {
        const { allHallData, visible, search, user, obj, email, password , obj2, phoneNumber} = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Element name="Home">

                    <AppBar style={{ background: '#3c3c3c' }} position="fixed">
                        <Toolbar>
                            <Typography component="h1" variant="h6" color="inherit" >

                            <IconButton color="inherit" title="Back" onClick={() => window.location.href = '/userDashboard'}>
                            <ArrowBack />   
                            </IconButton>&nbsp;&nbsp; Search Result
                            
                            </Typography>
                            <div style={{ marginLeft: 'auto', marginRight: '-12px' }}>
                                {user ? <div>
                                    
                                    <div className="dropdown">
                                        <button className="btn btn-success dropdown-toggle" style={{marginRight:60}} type="button" data-toggle="dropdown">Profile
                                        <span className="caret"></span></button>
                                        <ul className="ml dropdown-menu" style={{textAlign:'center', backgroundColor:' #383838',color:'#fff',float:'left'}}>
                                            <br/>
                                            <li>{user.fName}</li><hr style={{backgroundColor:'#ffffff'}}/>
                                            
                                            <li><a onClick={() => window.location.href='/userDashboard'}>Home</a></li>
                                            <br/>
                                            <li><a onClick={() => window.location.href='/user/chat'}>Message</a></li>
                                            <br/>
                                            <li><a onClick={() => window.location.href='/userDashboard/setting'}>Setting</a></li>
                                            <br/><hr style={{backgroundColor:'#ffffff'}}/>
                                            <li><a onClick={() => this.logout()}>Logout</a></li>
                                            <br/>
                                        </ul>
                                        </div>

                                </div>
                                    : <div>
                                        <Button style={{ color: 'white' }} onClick={() => window.location.href = '/privacyPolicy'}>
                                            Privacy Policy
                                    </Button>
                                        <Button style={{ color: 'white' }} data-toggle="modal" data-target="#exampleModalCenter">
                                            Login /             SignUp
                                    </Button>
                                    </div>
                                }

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
                                                    <FacebookLoginButton onClick={() => this.facebookLogin()}/>
                                                    <GoogleLoginButton onClick={() => this.googleLogin()}/>

                                                    <br />

                                                    <p style={{ color: 'black' }}>OR</p>

                                                    <div className="form-group">
                                                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => this.setState({ email: e.target.value })} aria-describedby="emailHelp" placeholder="Enter email" />
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                                                    </div>


                                                    <div className="d-flex justify-content-end">
                                                        <a style={{ color: 'blue' }}>forgot password?</a>
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


                        </Toolbar>
                    </AppBar>
                     <div style={{ position: 'relative' }}>
                        <img style={{height:'650px',width:'100%'}} src={require('../../resources/images/slide4.jpg')}/>

                         <div className="artist_name">
                            <div className="wrapper">Let Us Help You Create</div>
                        </div>
                        <Search />
                        </div>
                        
                    
                </Element>

                {
                    search & allHallData.length ? <div>
                       
                       <div style={{ background: '#ECECEC', padding: '30px' }}>
                        <h1 className="font_righteous" style={{ textAlign: 'center'}}> <span style={{color:'green'}}>{allHallData.length}</span> Result(s) found</h1>
                           
                            <Row gutter={16} >
                                {allHallData.map((v, i) => {
                                    
                                    return <Col span={8} key={i}>
                                         
                                        <Card 
                                            cover={<img alt="example" style={{ height: 260 }} src={`${v.picture[0]}`} />}
                                        >
                                             <h2 style={{float:'left',fontWeight:'bold'}}>{v.hallName}</h2>
                                             <label style={{float:'right'}}>{`Rs: ${v.price}`}</label>
                                            <br /><br/>
                                            <p style={{float:'left',fontWeight:'bold'}}> {v.address}</p>
                                            <label style={{float:'right'}}>Advance: {((v.price)*8)/100}</label>                 
          
                                            <div style={{textAlign:'center',marginTop:60}}>
                                            <IconButton style={{fontSize:'12px',float:'right'}}>
                                                <People />{v.capacity}
                                            </IconButton>
                                                
                                                <button type="primary" className="btn btn-success" style={{marginLeft:70}} onClick={() => this.venueBooking(v)} block>
                                                Register
                                                 </button>
                                               
                                              <br/><br/>
                                              <a style={{ color: 'blue' }} onClick={() => this.viewVenue(v)} block>
                                                View Venue
                                                </a>
                                                </div>
                                      
                                        </Card>
                                    </Col>
                                })}
                            </Row>
                            
                        </div>
                    </div> : allHallData.length ? <div>
                        
                        <div style={{ background: '#ECECEC', padding: '30px'}}>
                        <h1 className="font_righteous" style={{ textAlign: 'center'}}> <span style={{color:'green'}}>{allHallData.length}</span> Result(s) found</h1>
                            <Row gutter={16} >
                                {allHallData.map((v, i) => {
                                   
                                    return <Col span={8} key={i} style={{marginTop:'30px'}}>
                                         
                                        <Card
                                            cover={<img alt="example" style={{ height: 260 }} src={`${v.picture[0]}`} />}
                                        >
                                             <h2 style={{float:'left',fontWeight:'bold'}}>{v.hallName}</h2>
                                             <label style={{float:'right'}}>{`Rs: ${v.price}`}</label>
                                            <br /><br/>
                                            <label style={{float:'right'}}>Advance: {((v.price)*8)/100}</label> <br/>   <br/>
                                            <div className="scrollbar square scrollbar-lady-lips thin" style={{overflowY:'scroll' , height:'120px'}}>
             
                                            <p style={{float:'left',fontWeight:'bold'}}> {v.address}</p></div>
                                                         
          
                                            <div style={{textAlign:'center'}}>
                                            <IconButton style={{fontSize:'12px',float:'right'}}>
                                                <People />{v.capacity}
                                            </IconButton>
                                                
                                                <button type="primary" className="btn btn-success" style={{marginLeft:70}} onClick={() => this.venueBooking(v)} block>
                                                Register
                                                 </button>
                                               
                                              <br/><br/>
                                              <a style={{ color: 'blue' }} onClick={() => this.viewVenue(v)} block>
                                                View Venue
                                                </a>
                                                </div>
                                      
                                        </Card>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </div> :
                            <Skeleton />
                }
                <SearchByEmail/>

                < Footer />
                <Modal
                    visible={visible}
                    title="REGISTRATION FORM"
                    okText="Submit"
                    onCancel={() => this.setState({ visible: false })}
                    onOk={this.handleSubmit}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input placeholder="Enter your Name Here..." readOnly />)}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator('number', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input type="number" placeholder="Enter your Number Here..." />)}
                        </Form.Item>
                        <Form.Item label="Hall Name">
                            {getFieldDecorator('hallName', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input placeholder="Enter your Number Here..." readOnly />)}
                        </Form.Item>
                        <Form.Item label="Date and Time">
                            {getFieldDecorator('date-time-picker', {
                                rules: [{ type: 'object', required: true, message: 'Please select time!' }]
                            })(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" block style={{ float: 'left' }} />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>



            </div >


        );
    }
}

const SearchResultForm = Form.create({ name: 'form_in_modal' })(SearchResult);

export default SearchResultForm;