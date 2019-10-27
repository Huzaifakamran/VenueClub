import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactUsIcon from '@material-ui/icons/ContactSupport';
import SettingIcon from '@material-ui/icons/Settings';

import BookingIcon from '@material-ui/icons/AssignmentTurnedIn';


import { Link } from 'react-router-dom';
import LogoutIcon from '@material-ui/icons/Close';
import MessageIcon from '@material-ui/icons/Message';



function logout(){
  sessionStorage.removeItem('user')
  window.location.reload()
}

export const mainListItems = (
  <div>
    <Link to="/userDashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" style={{color:'#000000'}}/>
      </ListItem>
    </Link>

    <Link to="/searchResult">
      <ListItem button style={{marginTop:'15px'}}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search Venue" style={{color:'#000000'}}/>
      </ListItem>
    </Link>

    <Link to="/user/chat">
      <ListItem button style={{marginTop:'15px'}}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" style={{color:'#000000'}}/>
      </ListItem>
    </Link>

    <Link to="/userDashboard/setting">
      <ListItem button style={{marginTop:'15px'}}>
        <ListItemIcon>
          <SettingIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" style={{color:'#000000'}}/>
      </ListItem>
    </Link>

    <Link>
      <ListItem button style={{marginTop:'15px'}}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" style={{color:'#000000'}} onClick={() => logout()} />
      </ListItem>
    </Link>

  </div>
);

 export const secondaryListItems = (

  <div>
    <Link to="/user/contactUs">
      <ListItem button >
        <ListItemIcon>
          <ContactUsIcon />
        </ListItemIcon>
        <ListItemText primary="Contact Us" style={{color:'#000000'}}/>
      </ListItem></Link>

     {/*<ListItem button>
      <ListItemIcon>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" style={{color:'#000000'}}/>
    </ListItem> */}
   
  <p style={{fontStyle:'italic',marginTop:'30%',marginLeft:'7%'}}>Please read <a style={{color:'blue',fontWeight:'bold',textDecorationLine:'underline'}} onClick={() => window.open('/TermsAndCondition')}>Terms & Condition</a> <br/> and <a style={{color:'blue',fontWeight:'bold',textDecorationLine:'underline'}} onClick={() => window.open('/PrivacyPolicy')}>Privacy Policy</a> carefully.</p>
  <br/><hr/>
  </div>
);