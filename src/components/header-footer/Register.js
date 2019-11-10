import React, { Component } from 'react';
import '../../resources/bootstrap.min.css';
import Header from '../header-footer/FixedHeader';
import Footer from '../header-footer/Footer';
import firebase from '../../config/firebase'
import swal from 'sweetalert';
import { css } from '@emotion/core';
// First way to import
import { BeatLoader } from 'react-spinners';
import { display } from '@material-ui/system';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      disable: '',
      user: '',
      data: {
        hallName: '',
        address: '',
        capacity: '',
        price: '',
        picture: [],
        venueLocation: '',
        venueType: '',
        description: '',
        loading:false
      },
      pictureUrl: []
    }
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    this.setState({
      user: user
    })
    console.log(user)
  }

  updateData(e) {
    const { name, value } = e
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  updateFile(e) {
    const { name, files } = e
    this.setState({
      data: {
        ...this.state.data,
        [name]: files
      }
    })
  }

  async addData() {
    var { data, user, pictureUrl,loading } = this.state
    document.getElementById("register").style.display='none';
    // // Update progress bar
    // task.on('state_changed', (snapshot) => {
    //     var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     // uploader.value = percentage;
    //     console.log(percentage)
    //   },

    //   function error(err) {
    //     console.log('err')
    //   },

    //   function complete() {
    //     console.log('complete')
    //   }
    // );
    // storageRef.put(data.picture)
    // .then(() => {
    //   console.log('then')
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
     if (data.hallName === '' || data.address === '' || data.capacity === '' || data.price === '' || data.picture.length === 0 || data.venueLocation === '' || data.venueType === '' || data.description === '') {
      swal('Fill All textfield(s)').then((okay)=>{
        if(okay){
          document.getElementById("register").style.display='block';
        }
      })
      
      
    }else if(data.picture.length >= 4){
      swal('Upload 3 images at a time').then((okay)=>{
        if(okay){
          document.getElementById("register").style.display='block';
        }
      })
     
      
    }
    else {
      this.setState({ disable: true })
      this.setState({loading:true})

      firebase.database().ref('allHallData').child(`${user.uid}`).push(data)
        .then(async (snap) => {
          for (var i = 0; i < data.picture.length; i++) {
            var storageRef = firebase.storage().ref(`${user.uid}/${snap.key}/${data.picture[i].name}`)
            await storageRef.put(data.picture[i])
            storageRef.getDownloadURL()
              .then((url) => {
                console.log(url)
                pictureUrl.push(url)
                firebase.database().ref('allHallData').child(`${user.uid}/${snap.key}/picture/`).set(pictureUrl) })
          }
        })
        .then(() => {
          // window.location.reload()
          this.setState({
            data: {
              hallName: '',
              address: '',
              capacity: '',
              price: '',
              picture: [],
              venueLocation: '',
              venueType: '',
              
            },
            disable: false
          })
          
          window.location.href="/OwnerDashboard"
         
          
        }).catch(()=>{
          document.getElementById("register").style.display='block';
        })

    }
    
  }


  render() {
    const { data, disable,loading } = this.state
    return (
      <div style={{ textAlign: 'center' }}>
        <Header />

        <div style={{ marginTop: '140px', marginBottom: '50px', textAlign: 'center', marginLeft: '160px', marginRight: '160px' }}>
          <h2 style={{color:'green'}}>REGISTRATION FORM</h2>

          <div className="form-group mt-4" >
            <label for="inputName" style={{ float: 'left' }}>Hall name</label>
            <input type="text" className="form-control" id="inputName" placeholder="ABC Lawn" name="hallName" value={data.hallName} onChange={(e) => this.updateData(e.target)} />
          </div>

          <div className="form-group">
            <label for="inputAddress" style={{ float: 'left' }}>Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name="address" value={data.address} onChange={(e) => this.updateData(e.target)} />
          </div>
        

          <div className="form-group">
            <label for="inputAddress" style={{ float: 'left' }}>Description</label>
            <textarea type="text" className="form-control" placeholder="Lorem Ipsum...!" name="description" value={data.description} onChange={(e) => this.updateData(e.target)} />
          </div>

          <div className="form-row">
            <div className="col">
              <label for="inputCapacity" style={{ float: 'left' }}>Capacity</label>
              <input type="text" className="form-control" placeholder="500" name="capacity" value={data.capacity} onChange={(e) => this.updateData(e.target)} />
            </div>

            <div className="col">
              <label for="inputPrice" style={{ float: 'left' }}>Price</label>
              <input type="number" className="form-control" placeholder="Rs." name="price" value={data.price} onChange={(e) => this.updateData(e.target)} />
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <select name="venueType" onChange={(e) => this.updateData(e.target)} className="form-control" id="exampleFormControlSelect1" style={{
                // width: '250px',
                marginTop: 27,
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#ffffff'
              }} >
                <option value="">Select Venue Type</option>
                <option value="hall">Hall</option>
                <option value="banquet">Banquet</option>
              </select>
            </div>


            <div className="col">
              <select name="venueLocation" onChange={(e) => this.updateData(e.target)} className="form-control" id="exampleFormControlSelect1" style={{
                // width: '250px',
                marginTop: 27,
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#ffffff'
              }} >
                <option value="">Select Venue Location</option>
                <option value="gulshan-e-iqbal">Gulshan-e-Iqbal</option>
                <option value="nazimabad">Nazimabad</option>
                <option value="north nazimabad">North Nazimabad</option>
                <option value="defense">Defense</option>
              </select>
            </div>
          </div>

          <br />

          <div className="form-group">
            <label for="exampleFormControlFile1" style={{ float: 'left' }}>Upload hall images <label style={{color:'green'}}> (Atmost 3 pictures allowed!!) </label></label>
            <input type="file" accept="image/*" multiple className="form-control-file" id="exampleFormControlFile1" name="picture" onChange={(e) => this.updateFile(e.target)} />
          </div>

          <br />

          <div style={{ textAlign: 'center' }}>
            <button type="submit" id="register" className="btn btn-success" onClick={() => this.addData()} disabled={this.state.disable} >Register</button>
            {loading &&   <div className='sweet-loading'>
        <BeatLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={'#008F11'}
          loading={loading}
        /> 
      </div>}
       
          </div>

        </div>

        <Footer />
      </div>


    );
  }
}

export default Register;