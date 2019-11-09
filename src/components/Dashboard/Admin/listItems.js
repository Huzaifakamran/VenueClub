import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingIcon from '@material-ui/icons/Settings';
import ComplainIcon from '@material-ui/icons/Report';
import ShoppingCartIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import LogoutIcon from '@material-ui/icons/Close';
import BookingIcon from '@material-ui/icons/BookOutlined';
import { Link } from 'react-router-dom';

function logout(){
  console.log("Running.")
  sessionStorage.removeItem('user')
  window.location.reload()
} 
export const mainListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" style={{color:'#000000'}}/>
      </ListItem>

      <Link to="/adminDashboard/Users">
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Users" style={{color:'#000000'}}/>
      </ListItem>
      </Link>

      <Link to="/adminDashboard/RegisteredHalls">
      <ListItem button>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Registered Halls" style={{color:'#000000'}}/>
      </ListItem>
      </Link>

      <Link to="/adminDashboard/Bookings">
      <ListItem button>
        <ListItemIcon>
          <BookingIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings" style={{color:'#000000'}}/>
      </ListItem>
      </Link>

      <ListItem button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" onClick={() => logout()} style={{color:'#000000'}}/>
      </ListItem>

    </div>
  );
  
export const secondaryListItems=(
  
  <div>
  <Link to="/adminDashboard/Complaints">
      <ListItem button >
        <ListItemIcon>
          <ComplainIcon />
        </ListItemIcon>
        <ListItemText primary="Complaints" style={{color:'#000000'}}/>
      </ListItem>
      </Link>
      <br/><br/><br/><br/>
      <p style={{fontStyle:'italic',marginTop:'30%',marginLeft:'7%'}}>Please read <a style={{color:'green',fontWeight:'bold',textDecorationLine:'underline'}} onClick={() => window.open('/TermsAndCondition')}>Terms & Condition</a> <br/> and <a style={{color:'green',fontWeight:'bold',textDecorationLine:'underline'}} onClick={() => window.open('/PrivacyPolicy')}>Privacy Policy</a> carefully.</p>
       <hr/>
  <br/>
  </div>
);