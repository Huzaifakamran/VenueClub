import React, { PureComponent } from 'react'
import Footer from '../header-footer/Footer';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

class Index extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <div>
                        <nav className="navbar navbar-expand-lg navbar-light bck_black fixed-top">
                    <IconButton style={{color:'white'}} onClick={()=>window.location.href='/'}>
                        <ArrowBack/>
                    </IconButton>
                    <img style={{ width: '90px', height: '90px' }} src={require('../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
                    <div className="header_logo">
                        <div className="font_righteous header_logo_venue" style={{ color: 'white', fontSize: '30px' }}>Venue Club</div>
                        <div className="header_logo_title" style={{ color: 'white' }}>Design Your Perfect Event</div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav head_ul" style={{ marginLeft: '95%' }}>
                        <li>   <button title="payment method" onClick={() => window.location.href = "/"} style={{ background: 'none', border: 'none', color: '#ffffff', margin: '10px' }}>Home</button></li>
                           
                        </ul>
                    </div>
                    </nav>
                </div> 
                <div style={{textAlign:'center'}}>
                <br/>
                <img style={{width: '20%', height: '20%' ,marginTop:'100px'}} src={require('../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
        
                    <h1 className="font_righteous">Payment Method:</h1><br/>
                    <p style={{fontWeight:'bold'}}>1) When your request is approved, you have to pay advance fee to the admin within some days. Otherwise your request will be deleted</p>
                    <p style={{fontWeight:'bold'}}>2) send your advance fee on the given number below:<br/><br/><h1 style={{color:'green'}}>03133546506</h1>.</p>
                    <p style={{fontWeight:'bold',marginBottom:'100px'}}>3) After that you will get  notification from admin.</p>
                
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index