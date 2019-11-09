import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import BookingIcon from '@material-ui/icons/AssignmentTurnedIn';
import ContactUsIcon from '@material-ui/icons/ContactSupport';
import { Link } from 'react-router-dom';

import MessageIcon from '@material-ui/icons/Message';
import LogoutIcon from '@material-ui/icons/Close';


function logout(){
  sessionStorage.removeItem('user')
  window.location.reload()
}

export const mainListItems = (
  <div>
    <Link to="/OwnerDashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" style={{color:'#000000'}}/>
      </ListItem>
    </Link>

    <Link to="/OwnerDashboard/booking">
      <ListItem button>
        <ListItemIcon>
          <BookingIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings" style={{color:'#000000'}}/>
      </ListItem>
    </Link>

    <Link to="/OwnerDashboard/chat">
      <ListItem button>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" style={{color:'#000000'}}/>
      </ListItem>
    </Link>

    <Link to="/OwnerDashboard/setting">
      <ListItem button>
        <ListItemIcon>
          <SettingIcon />
        </ListItemIcon>
        <ListItemText primary="Setting"style={{color:'#000000'}} />
      </ListItem>
    </Link>

    <Link>
      <ListItem button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" onClick={() => logout()} style={{color:'#000000'}}/>
      </ListItem>
    </Link>

  </div>
);

export const secondaryListItems = (

  <div>


    <Link to="/owner/Contactus">
      <ListItem button >
        <ListItemIcon>
          <ContactUsIcon />
        </ListItemIcon>
        <ListItemText primary="Contact Us" style={{color:'#000000'}}/>
      </ListItem></Link>

    {/* <Link to="/OwnerDashboard/Card">
      <ListItem button>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Card" />
      </ListItem>
    </Link>
    <Link to="/HallDetails">
      <ListItem button>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Hall Details" />
      </ListItem>
    </Link> */}
    <p style={{fontStyle:'italic',marginTop:'30%',marginLeft:'7%'}}>Please read <a style={{color:'green',fontWeight:'bold',textDecorationLine:'underline'}} onClick={() => window.open('/TermsAndCondition')}>Terms & Condition</a> <br/> and <a style={{color:'green',fontWeight:'bold',textDecorationLine:'underline'}} onClick={() => window.open('/PrivacyPolicy')}>Privacy Policy</a> carefully.</p>
  <br/><hr/>
  </div>
);