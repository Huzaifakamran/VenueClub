import React, { Component } from 'react';
import Flip from 'react-reveal/Flip';
import '../../resources/bootstrap.min.css';
class AboutUS extends Component {
 
    render() {
        return (
          <div className="bck_black">
         <br/>
            <div className="font_righteous" style={{color:'white', textAlign:'center', fontSize:'45px'}}>Our Team</div>
            <br/>
           <div className="container">
              <div className="row" >

                  <div className="col-sm-3" style={{minWidth:'250px' , margin:'2px auto'}}>
                      <div className="our_team">
                      <Flip left>
                        <div className="pic" >
                          <img src={require('../../resources/images/AboutUs/huzaifa.jpg')}/>
                        </div>
                        <div className="team_content">
                          <h3 className="title">Huzaifa Kamran</h3>
                          <span className="post">Web Developer || Chatbot Developer</span>
                        </div>
                        <ul className="social">
                          <li><a href={'https://www.facebook.com/mohammad.huzaifa.1694'} className="fa fa-facebook"></a> </li>
                          <li><a href={'https://twitter.com/Huzaifa_Kamran4'} className="fa fa-twitter"></a> </li>
                          <li><a href={'https://www.linkedin.com/in/huzaifa-kamran-a30714175'} className="fa fa-linkedin"></a> </li>
                        </ul>
                        </Flip>
                      </div>
                      
                  </div>

                  <div className="col-sm-3" style={{minWidth:'250px' , margin:'2px auto'}}>
                  <div className="our_team">
                  <Flip left>
                    <div className="pic">
                      <img src={require('../../resources/images/AboutUs/majid.jpg')}/>
                    </div>
                    <div className="team_content">
                      <h3 className="title">Majid Nawaz</h3>
                      <span className="post">App Developer || IOS Developer </span>
                    </div>
                    <ul className="social">
                      <li><a href={'https://www.facebook.com/majid.arif.1466'} className="fa fa-facebook"></a> </li>
                      <li><a href={'https://twitter.com/Majid5Nawaz'} className="fa fa-twitter"></a> </li>            
                      <li><a href={'https://www.linkedin.com/in/majid-nawaz-7bb175132/'} className="fa fa-linkedin"></a> </li>
                    </ul>
                    </Flip>
                  </div>
                  
              </div>

              <div className="col-sm-3" style={{minWidth:'250px' , margin:'2px auto'}}>
              <div className="our_team">
              <Flip left>
              
                <div className="pic">
                  <img src={require('../../resources/images/AboutUs/soha.jpg')}/>
                </div>
                <div className="team_content">
                  <h3 className="title">Soha Khalid</h3>
                  <span className="post">Report Writer || Web Designer</span>
                </div>
                <ul className="social">
                  <li><a href={'https://www.facebook.com/soha.khalid.585'} className="fa fa-facebook"></a> </li>
                  <li><a href={'https://twitter.com/SohaKhalid16'} className="fa fa-twitter"></a> </li>
                  <li><a href={'www.linkedin.com/in/soha-khalid-010614187'} className="fa fa-linkedin"></a> </li>
                </ul>
                </Flip>
              </div>
          </div>

          <div className="col-sm-3" style={{minWidth:'250px' , margin:'2px auto'}}>
              <div className="our_team">
              <Flip left>
                <div className="pic">
                   <img src={require('../../resources/images/AboutUs/maryam.jpg')}/>
                  </div>
                <div className="team_content">
                  <h3 className="title">Maryam Khan</h3>
                  <span className="post">Database Administrator || Chatbot Developer</span>
                </div>
                <ul className="social">
                  <li><a href={'https://www.facebook.com/maryam.khan.31586'} className="fa fa-facebook"></a> </li>
                  <li><a href={'https://twitter.com/Maryamkhan45'} className="fa fa-twitter"></a> </li>
                  <li><a href={'https://www.linkedin.com/in/maryam-khan-867417160/'} className="fa fa-linkedin"></a> </li>
                </ul>
                </Flip>
              </div>
          </div>

              </div>
           </div>
           <br/><br/></div>
           
          
        );
    }
}

export default AboutUS;