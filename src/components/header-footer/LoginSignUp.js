import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
// import 'bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import $ from 'jquery';
import firebase from '../../config/firebase';
// import Image from 'react-bootstrap/Image';
class LoginSignUp extends Component {
    
    constructor(){
        super();
        this.state={
            showLogin:true,
            showSignup:false
        }
    }

    showSignup(){
        $('#exampleModalCenter').modal('hide');
        $('#signupModalCenter').modal('show');
    }

    showLogin(){
        $('#signupModalCenter').modal('hide');
        $('#exampleModalCenter').modal('show');
    }
    
    login(){
        var email=document.getElementById('email').value;
        var password=document.getElementById('password').value;

        if(email == '' || password == ''){
            alert('Enter both textfield(s)')
        }
        else{
            firebase.auth().signInWithEmailAndPassword(email,password).then((userResponse)=>{
                document.getElementById('email').value='';
                document.getElementById('password').value='';
                
                alert('login successfull')
            })
            .catch((error)=>{
                alert('something went wrong'+error);
            });
        }
    }

    signUp(){
        var email=document.getElementById('email1').value;
        var password=document.getElementById('password1').value;

        if(email == '' || password == ''){
            alert('Enter both textfield(s)')
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email,password).then((userResponse)=>{
                
                document.getElementById('email1').value='';
                document.getElementById('password1').value='';
                
                alert('Signup successfull'+userResponse);
            })
            .catch((error)=>{
                alert('something went wrong'+error);
            });
        }
    }

    render(){ 
        const{showLogin , showSignup}=this.state;
    return (  
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
                     <FacebookLoginButton />
                     <GoogleLoginButton />

                     <br />

                     <p style={{ color: 'black' }}>OR</p>

                     <div className="form-group">
                         <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                     </div>

                     <div className="form-group">
                         <input type="password" className="form-control" id="password" placeholder="Password" />
                     </div>


                     <div className="d-flex justify-content-end">
                         <a style={{ color: 'blue' }}>forgot password?</a>
                     </div>

                 </div>

                 <div className="modal-footer d-flex justify-content-center" style={{ textAlign: 'center' }}>
                     <div>
                         <br />
                         <button type="button"  className="btn btn-success" onClick={()=>this.login()}>Login</button>
                         <br />
                         <br />
                         <p style={{ color: 'black' }}>Don't have an account? <a style={{ color: 'blue' }} onClick={()=>{this.showSignup()}} data-toggle="modal" >Sign up</a>
                         </p>
                         
                     </div>
                 </div>
             </div>
         </div>
     </div>
   


    
        <div className="modal fade" style={{overflow:'scroll'}} id="signupModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">



                    <div className="d-flex justify-content-center" style={{ width: '100%'}}>
                        <h5 style={{ color: 'black' }} className="modal-title" id="exampleModalLongTitle">Signup page</h5>

                    </div>

                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>


                <div className="modal-body" style={{ textAlign: 'center' }}>
                    <br /><br />
                    <FacebookLoginButton />
                    <GoogleLoginButton />

                    <br />

                    <p style={{ color: 'black' }}>OR</p>
            

                    <div className="form-group">
                        <input type="name" className="form-control" id="f_name" aria-describedby="emailHelp" placeholder="First name" />
                    </div>

                    <div className="form-group">
                    <input type="name" className="form-control" id="l_name" aria-describedby="emailHelp" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                    <input type="email" className="form-control" id="email1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                    <input type="number" className="form-control" id="phone" placeholder="Phone #" />
                   </div>

                    <div className="form-group">
                        <input type="password" className="form-control" id="password1" placeholder="Password" />
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" id="confirm_pwd" placeholder="Confirm Password" />
                    </div>

                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                    <option selected>Select Account Type...</option>
                    <option value="1">User</option>
                    <option value="2">Hall Owner</option>
                   
                  </select>

                </div>

                <div className="modal-footer d-flex justify-content-center" style={{ textAlign: 'center' }}>
                <br />    
                <div>     
                   
                <p style={{color:'grey'}}>
                    By signing up, I agree to Venue Club's <a style={{color:'blue',fontWeight:'bold',textDecorationLine:'underline'}} onClick={() => window.location.href = '/PrivacyPolicy'}>Terms & Condition</a> <br/> and <a style={{color:'blue',fontWeight:'bold',textDecorationLine:'underline'}} onClick={() => window.location.href = '/PrivacyPolicy'}></a>Privacy Policy.
                    </p>

                        <br/>

                        <button type="button" className="btn btn-success" onClick={()=>this.signUp()}>Sign Up</button>
                        <br />
                        <br />
                        <p style={{ color: 'black' }}>Already have an account? <a style={{ color: 'blue' }} onClick={()=>{this.showLogin()}} data-toggle="modal" >Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    


    </div>

    )}
}

export default LoginSignUp;