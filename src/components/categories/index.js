import React, { Component } from 'react';
import MyButton from '../utills/MyButton';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import '../../resources/bootstrap.min.css';
class Categories extends Component {
    render() {
        return (
            
            <div className="center_wrapper pricing_section container mb-5">
              <h2 className="text-center" style={{color:'black'}}>Categories</h2>  
            <br/>
          
                <div className="row" >
                    
              
                <Flip>
                    <div className="container_category column" style={{float:'left',width:'33.33%',padding:'15px'}}>
                    <img  className="category_image" src={require('../../resources/images/Categories/1.jpg')} alt="Notebook"/> 
                    <div className="middle">
                    <div className="text_category" onClick={()=>window.location.href='/searchResult'}>Banquets</div>
                    </div>
                    </div>
                    
                 </Flip>
              
             
                 <Flip>
                    <div className="container_category column" style={{float:'left',width:'33.33%',padding:'15px'}}>
                    <img  className="category_image" src={require('../../resources/images/Categories/2.jpg')} alt="Notebook"/>
                    <div className="middle">
                    <div className="text_category" onClick={()=>window.location.href='/searchResult'}>Halls</div>
                    </div>
                    </div>
                    
                 </Flip>

              

                 <Flip>
                    <div className="container_category column" style={{float:'left',width:'33.33%',padding:'15px'}}>
                    <img  className="category_image" src={require('../../resources/images/Categories/3.jpg')} alt="Notebook" />
                    <div className="middle">
                    <div className="text_category" onClick={()=>window.location.href='/searchResult'}>Lawns</div>
                    </div>
                    </div>
                    
                 </Flip>
              
               </div>
           </div>
        );
    }
}

export default Categories;