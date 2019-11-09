import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
import Flip from 'react-reveal/Flip';

class Discount extends Component {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <div className="container">
                    <div className="row">
                    <div className="col-md-5" style={{margin:'2px auto'}}>
                    <div className="row">
                      
                      <Flip>
                      
                        <img style={{height:'250px',width:'200px',margin:'2px auto'}} src={require('../../resources/images/shadman.png')} className="card-img" alt="..."/>
                        </Flip>
                        
                      <div className="col-md" >
                        <div className="card-body" style={{textAlign:'left'}}>
                          <h5 className="card-title" style={{color:'green'}}>Shadman Banquet</h5>
                          <h5 className="card-title" style={{color:'red'}}>50% OFF</h5>
                          <p className="card-text">Minimum Dining For 500 persons</p>
                          <p className="card-text"><small className="text-muted">D- J, Sakhi Hassan Graveyard Internal Road, Block J North Nazimabad Town, Karachi.</small></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 " >
                    <div className="row">
                      
                      <Flip>
                      
                      <img style={{height:'250px',width:'200px',margin:'2px auto'}} src={require('../../resources/images/taj.png')} className="card-img" alt="..."/>
                      </Flip>
                       
                      <div className="col-md" >
                        <div className="card-body" style={{textAlign:'left'}}>
                          <h5 className="card-title" style={{color:'green'}}>Taj Banquet</h5>
                          <h5 className="card-title" style={{color:'red'}}>30% OFF</h5>
                          <p className="card-text">Minimum Dining For 600 persons</p>
                          <p className="card-text"><small className="text-muted">Sharah-e-Sher Shah Suri, Block A North Nazimabad Town, Karachi.</small></p>
                        </div>
                      </div>
                    </div>
                  </div>

                    </div>
                </div>

                <div className="container my-4">
                    <div className="row" >
                    <div className="col-md-5" style={{margin:'2px auto'}}>
                    <div className="row ">
                     
                      <Flip>
                      
                      <img style={{height:'250px',width:'200px',margin:'2px auto'}} src={require('../../resources/images/caspita.jpg')} className="card-img" alt="..."/>
                      </Flip>
                         
                      <div className="col-md">
                        <div className="card-body" style={{textAlign:'left'}}>
                          <h5 className="card-title" style={{color:'green'}}>Caspia Banquet</h5>
                          <h5 className="card-title" style={{color:'red'}}>60% OFF</h5>
                          <p className="card-text">Minimum Dining For 600 persons</p>
                          <p className="card-text"><small className="text-muted">D-8, Block-L, North Nazimabad Shahrah - Sher Shah Suri Road، Near 5 Star Chorangi، Block L North Nazimabad Town, Karachi.</small></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5" >
                  <div className="row ">
                    
                    <Flip>
                      
                    <img style={{height:'250px',width:'200px',margin:'2px auto'}} src={require('../../resources/images/lovely.jpg')} className="card-img" alt="..."/>
                    </Flip>
                      
                    <div className="col-md">
                      <div className="card-body" style={{textAlign:'left'}}>
                        <h5 className="card-title" style={{color:'green'}}>Lovely Lawn</h5>
                        <h5 className="card-title" style={{color:'red'}}>50% OFF</h5>
                        <p className="card-text">Minimum Dining For 700 persons</p>
                        <p className="card-text"><small className="text-muted">gulberg main chaurangi near TFS school, Karachi</small></p>
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

export default Discount;