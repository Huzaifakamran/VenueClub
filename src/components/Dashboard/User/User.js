import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import RegisterIcon from '@material-ui/icons/AddCircle'
import Message from '@material-ui/icons/Message';
import UserIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import DotsIcon from '@material-ui/icons/MoreVert';
import { mainListItems, secondaryListItems } from './listItems';
import { Link } from 'react-router-dom';
import Deposits from './Deposits';
import Orders from './Orders';
import { Button } from '@material-ui/core';
import 'antd/dist/antd.css';
import '../../../resources/bootstrap.min.css';
import { Card, Skeleton, Table } from 'antd';
import Zoom from 'react-reveal/Zoom';

const { Meta } = Card;

const drawerWidth = 240;

const columns = [
  {
    title: 'Hall Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>
  },
  {
    title: 'Program Date',
    dataIndex: 'pDate',
  },
  {
    title: 'Status',
    dataIndex: 'status'
  }
]



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 500,
  },
}));


function logout(){
  sessionStorage.removeItem('user')
  window.location.reload()
}


export default function Dashboard(props) {


  const classes = useStyles();
  console.log(props)


  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    document.getElementById("dot_icon").style.display = "inline-block";
     setOpen(true);
  };
  const handleDrawerClose = () => {
    document.getElementById("dot_icon").style.display = "none";
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar style={{ background: '#3c3c3c' }} position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >

            <MenuIcon />
          </IconButton>


          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            
            <Link> <DotsIcon id="dot_icon" onClick={handleDrawerClose} style={{ color: 'white',float:'left' }} /></Link>
            &nbsp;
             User Dashboard
            </Typography>
             <div className="dropdown">
                <button className="btn btn-success dropdown-toggle" style={{marginRight:60}} type="button" data-toggle="dropdown">Profile
                <span className="caret"></span></button>
                <ul className="ml dropdown-menu" style={{textAlign:'center', backgroundColor:' #383838',color:'#fff',float:'left'}}>
                  <br/>
                  <li>{props.user.fName}</li><hr style={{backgroundColor:'#ffffff'}}/>
                  
                  <li><a onClick={() => window.location.href='/userDashboard'}>Home</a></li>
                  <br/>
                  <li><a onClick={() => window.location.href='/user/chat'}>Message</a></li>
                  <br/>
                  <li><a onClick={() => window.location.href='/userDashboard/setting'}>Setting</a></li>
                  <br/><hr style={{backgroundColor:'#ffffff'}}/>
                  <li><a onClick={logout}>Logout</a></li>
                  <br/>
                </ul>
              </div>
          

        
        
          
         
          

        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
       
        <div className="font_righteous" >
          <img style={{float:'left',width: '60px', height: '60px' }} src={require('../../../resources/images/final.png')} onClick={()=> window.location.href='/'}/>
          <h1 style={{float:'left',marginTop:'30px'}}> Venue Club</h1></div>
        <Divider className="mt-1"/>
        <div className="my-3">
          <List >{mainListItems}</List>
        </div>

        <Divider />


       <div className="my-4">
          <List >{secondaryListItems}</List>
        </div> 

      </Drawer>

      {props.data.length ? <div style={{ width: '100%', justifyContent: 'center', textAlign: 'center', marginTop: 140 }}>
      <h2 style={{color:'black'}} className="font_righteous">My Recent Bookings</h2>
      <br/>
        <Table
          // pagination={false}
          style={{ marginLeft:'10px', width: '94%',border:'solid' }}
          columns={columns}
          dataSource={props.data.slice().reverse()}
        />
       </div> : !props.isData ? 
       
       <Zoom delay={5000}>
       <div style={{ width: '100%', justifyContent: 'center', textAlign: 'center', marginTop: 140 }}>
       <h1 className="font_righteous"> Welcome to the user dashboard</h1>
       <img style={{width:'50%', height: '70%' }} src={require('../../../resources/images/final.png')} onClick={()=> window.location.href='/'}/><br/><br/>
       <button type="button" className="btn btn-success" style={{padding:'10px 10px'}} onClick={()=>window.location.href='/searchResult'}>Search Venue &nbsp;<SearchIcon/></button>
            
      </div></Zoom>
      
      : <Skeleton />} 
     </div>
  )
}