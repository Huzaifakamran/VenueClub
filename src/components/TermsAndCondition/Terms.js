import React, { Component } from 'react';
import Footer from '../header-footer/Footer';
import SearchByEmail from '../SearchByEmail/index';
import $ from 'jquery';
import '../../resources/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

class Terms extends Component {


    componentDidMount(){ 
     $('html,body').scrollTop(0); 
    }
    render() {
         
        return (
           <div id="terms_and_condition">
               
               <nav className="navbar navbar-expand-lg navbar-light bck_black fixed-top">
              
                    <img style={{ width: '90px', height: '90px' }} src={require('../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
                    <div className="header_logo">
                        <div className="font_righteous header_logo_venue" style={{ color: 'white', fontSize: '30px' }}>Venue Club</div>
                        <div className="header_logo_title" style={{ color: 'white' }}>Design Your Perfect Event</div>
                    </div>
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav head_ul" style={{ marginLeft: '85%' }}>
                            <li>   <button title="privacy policy" onClick={() => window.location.href = "/PrivacyPolicy"} style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>PRIVACY POLICY</button></li>
                        </ul>
                    </div>
                </nav>


                <div style={{textAlign:'center',marginTop:'100px'}}>
                <br/>
                    <h1 className="font_righteous">Terms And Condition</h1>
                </div>
                <br/>
                <div style={{marginLeft:"200px",marginRight:"200px"}}>

                 <p>Welcome to venueclub!
                    These terms and conditions outline the rules and 
                    regulations for the use of venueclub's Website.
                    By accessing this website we assume you accept these
                    terms and conditions. Do not continue to use venueclub
                    if you do not agree to take all of the terms and conditions 
                    stated on this page.

                </p>
                

                
                    
                        <h5>Cookies</h5>

                            <p>We employ the use of cookies. By accessing venueclub,
                               you agreed to use cookies in agreement with the venueclub's
                               Privacy Policy.Most interactive websites use cookies to let 
                               us retrieve the user’s details for each visit. Cookies are 
                               used by our website to enable the functionality of certain
                                areas to make it easier for people visiting our website. 
                                Some of our affiliate/advertising partners may also use cookies.
                            </p>

                        <h5>License</h5>

                            <p>Unless otherwise stated, venueclub and/or its licensors own the 
                                intellectual property rights for all material on venueclub. 
                                All intellectual property rights are reserved. You may access 
                                this from venueclub for your own personal use subjected to restrictions 
                                set in these terms and conditions.<br/>
                                You must not:

                                <ul>
                                    <li>Republish material from venueclub</li>
                                    <li>Sell, rent or sub-license material from venueclub</li>
                                    <li>Reproduce, duplicate or copy material from venueclub</li>
                                    <li>Redistribute content from venueclub</li>
                                </ul><br/>
                                This Agreement shall begin on the date hereof.<br/>
                                Parts of this website offer an opportunity for users 
                                to post and exchange opinions and information in certain 
                                areas of the website. venueclub does not filter, edit, 
                                publish or review Comments prior to their presence on 
                                the website. Comments do not reflect the views and opinions 
                                of venueclub,its agents and/or affiliates. Comments reflect 
                                the views and opinions of the person who post their views and 
                                opinions. To the extent permitted by applicable laws, venueclub
                                shall not be liable for the Comments or for any liability,
                                damages or expenses caused and/or suffered as a result of
                                any use of and/or posting of and/or appearance of the
                                Comments on this website.<br/>
                                venueclub reserves the right to monitor all Comments and 
                                to remove any Comments which can be considered inappropriate, 
                                offensive or causes breach of these Terms and Conditions.<br/>
                                You warrant and represent that:<br/>
                                <ul>
                                    <li>You are entitled to post the Comments on our website and 
                                        have all necessary licenses and consents to do so;</li>
                                    <li>The Comments do not invade any intellectual property right,
                                        including without limitation copyright, patent or trademark 
                                        of any third party;</li>
                                    <li>The Comments do not contain any defamatory, libelous, 
                                        offensive, indecent or otherwise unlawful material which 
                                        is an invasion of privacy</li>
                                    <li>The Comments will not be used to solicit or promote business
                                         or custom or present commercial activities or unlawful activity</li>
                                </ul><br/>
                                You hereby grant venueclub a non-exclusive license to use, reproduce, 
                                edit and authorize others to use, reproduce and edit any of your 
                                Comments in any and all forms, formats or media.
                            </p>

                        <h5>Content Liability</h5>

                            <p>We shall not be hold responsible for any content that appears on 
                                your Website. You agree to protect and defend us against all 
                                claims that is rising on your Website. No link(s) should appear 
                                on any Website that may be interpreted as libelous, obscene or 
                                criminal, or which infringes, otherwise violates, or advocates 
                                the infringement or other violation of, any third party rights.
                            </p><br/>

                        <h5>Your Privacy</h5>
                                <p>Please read Privacy Policy</p>
                  <br/>
                        <h5>Removal of links from our website</h5>

                        <p>If you find any link on our Website that is offensive for any reason,
                             you are free to contact and inform us any moment. We will consider 
                             requests to remove links but we are not obligated to or so or to
                              respond to you directly.<br/>
                              We do not ensure that the information on this website is correct, 
                              we do not warrant its completeness or accuracy; nor do we promise 
                              to ensure that the website remains available or that the material 
                              on the website is kept up to date.
                        </p>

                        <h5>Partners</h5>

                                <p>For our bussiness partners of venues, the conditions apply will
                                    you must have to pay our charges which will be deduct from your 
                                    venue when customer will do a booking for your place.<br/>
                                    The charges of our services will be a<b>5 %</b>  of per booking.<br/>
                                    When you fill a form as our partner then we will have the right to 
                                    disapproved your profile if we find any fraud or any inappropriate 
                                    information about your profile.
                                </p>
                      
                </div>

                <br/>
                <br/>
                <SearchByEmail/>
                <br/>
               <Footer/>
            </div>
           
           
        );
    }
}

export default Terms;