import React, { Component } from 'react';
import clsx from 'clsx';
import '../../../resources/bootstrap.min.css';
import Footer from '../../header-footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import RegisterIcon from '@material-ui/icons/AddCircle';
import Message from '@material-ui/icons/Message';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Table, Skeleton, Modal, Button as Btn } from 'antd';
import { stat } from 'fs';
import firebase from '../../../config/firebase'
import ArrowBack from '@material-ui/icons/ArrowBack';



class OwnerBooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            visible: false,
            confirmLoading: false,
            columns: [
                {
                    title: 'Customer Name',
                    dataIndex: 'name',
                    render: text => <a href="#" onClick={() => this.setState({ visible: true, modalData: text }, () => {
                        console.log(this.state.modalData)
                    })}>{text.name}</a>
                },
                {
                    title: 'Hall Name',
                    dataIndex: 'hallName',
                },
                {
                    title: 'Program Date',
                    dataIndex: 'pDate',
                },
                {
                    title: 'Statue',
                    dataIndex: 'status'
                }
            ],
            data: [],
            date: new Date(),
            modalData: '',

        }
    }

    componentWillMount() {
        const { user, data } = this.state
        firebase.database().ref('users').child(`${user.uid}/recBooking`).on('child_added', (val) => {
            var value = val.val()
            value['key'] = val.key
            data.push({
                key: val.key,
                name: value,
                hallName: value.hallName,
                pDate: value['date-time-picker'],
                status: value.status
            });
            this.setState({ data })
        })
    }

    handleOk = () => {
        const { modalData, user } = this.state
        console.log('modalData', modalData)
        if (modalData.status === "pending") {
            this.setState({
                ModalText: 'The modal will be closed after two seconds',
                confirmLoading: true,
            });
            var message = `Your request has approved Kindly pay the Advance fees Rs: ${Number(modalData.hallData.price) / 10} of ${modalData.hallName} to the admin number : 03133546506`
            var myMsg = {
                msg: message,
                recName: modalData.name
            }
            var recMsg = {
                msg: message,
                senderName: user.fName
            }

            firebase.database().ref('users').child(`${user.uid}/chatList/${modalData.customerUid}`).set(modalData.name)
            firebase.database().ref('users').child(`${modalData.customerUid}/chatList/${user.uid}`).set(user.fName)
            firebase.database().ref('allHallData').child(`${user.uid}/${modalData.hallData.key}/bookings`).set({ bookID : modalData.customerUid })

            firebase.database().ref('users').child(`${user.uid}/recBooking/${modalData.key}`).update({ status: "Approved" })
            firebase.database().ref('users').child(`${modalData.customerUid}/sentBooking/${modalData.key}`).update({ status: "Approved" })

            firebase.database().ref('users').child(`${user.uid}/chat/${modalData.customerUid}/`).push(myMsg)
                .then((snap) => {
                    firebase.database().ref('users').child(`${modalData.customerUid}/chat/${user.uid}/${snap.key}`).set(recMsg)
                        .then(() => {
                            this.setState({
                                visible: false,
                                confirmLoading: true,
                            }, () => {
                                this.props.history.push(`/OwnerDashboard/chat`)
                            })
                        })
                })
        }
        this.setState({
            visible: false
        })
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    handleCancel1 = () => {
        const { modalData, user } = this.state
        if (modalData.status === "pending") {
            firebase.database().ref('users').child(`${user.uid}/recBooking/${modalData.key}`).update({ status: "Rejected" })
            firebase.database().ref('users').child(`${modalData.customerUid}/sentBooking/${modalData.key}`).update({ status: "Rejected" })
                .then(() => {
                    this.setState({
                        visible: false,
                    }, () => {
                        window.location.reload()
                    })
                })
        }
        else {
            this.setState({
                visible: false
            })
        }
    };


    logout() {
        sessionStorage.removeItem('user')
        window.location.reload()
    }



    render() {
        const { visible, confirmLoading, columns, data, modalData,user } = this.state

        return (
            <div>
                <AppBar style={{ background: '#3c3c3c' }} position="fixed">
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" >
                            <IconButton color="inherit" title="Back" onClick={() => window.location.href = '/OwnerDashboard'}>
                                <ArrowBack />
                            </IconButton>&nbsp;&nbsp; Venue Club
                         </Typography>
                        <div className="dropdown"  style={{marginLeft:980}}>
                <button className="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown">Profile
                <span className="caret"></span></button>
                <ul className="ml dropdown-menu" style={{textAlign:'center', backgroundColor:' #383838',color:'#fff',float:'left'}}>
                  <br/>
                  <li>{user.fName}</li><hr style={{backgroundColor:'#ffffff'}}/>
                  
                  <li><a onClick={() => window.location.href='/OwnerDashboard'}>Home</a></li>
                  <br/>
                  <li><a onClick={() => window.location.href='/OwnerDashboard/chat'}>Message</a></li>
                  <br/>
                  <li><a onClick={() => window.location.href='/OwnerDashboard/setting'}>Setting</a></li>
                  <br/><hr style={{backgroundColor:'#ffffff'}}/>
                  <li><a onClick={()=>this.logout()}>Logout</a></li>
                  <br/>
                </ul>
              </div>

                    </Toolbar>
                </AppBar>
                <h1 className="font_righteous" style={{color:'green',textAlign:'center', marginTop: 140}}>Booking Requests</h1>
                   <br/>
                <div style={{ width: '100%', justifyContent: 'center', display: 'flex', textAlign: 'center' }}>
             
                    {data.length ? <Table
                        style={{ width: '94%' }}
                        columns={columns}
                        dataSource={data.slice().reverse()}
                    /> : <Skeleton active />}
                </div>
                <Modal
                    visible={visible}
                    title={modalData.hallName}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Btn key="back" type={modalData.status === "pending" ? "danger" : "secondary"} onClick={this.handleCancel1}>
                            {modalData.status === "pending" ? "Reject" : "Cancel"}
                        </Btn>,
                        <Btn key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
                            {modalData.status === "pending" ? "Accept" : "Ok"}
                        </Btn>,
                    ]}
                >
                    <h3>Customer Name: {modalData.name}</h3>
                    <h4>Customer Number: {modalData.number}</h4>
                </Modal>
                <Footer />
            </div>


        );
    }
}

export default OwnerBooking;