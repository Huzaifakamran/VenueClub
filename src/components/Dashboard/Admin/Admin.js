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
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import RegisterIcon from '@material-ui/icons/AddCircle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import UserIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import { mainListItems , secondaryListItems } from './listItems';
import { Link } from 'react-router-dom';
import DotsIcon from '@material-ui/icons/MoreVert';

const drawerWidth = 240;

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
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ background: '#3c3c3c' }} position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar  className={classes.toolbar}>
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
          <Link> <DotsIcon id="dot_icon" onClick={handleDrawerClose} style={{ color: 'white' }} /></Link>
            &nbsp;
           Admin Dashboard
          </Typography>


        
          <IconButton color="inherit" title="Profile">
          <UserIcon/>
          </IconButton>


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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>

                <div style={{textAlign:'center',marginTop:'80px'}}>
            <p>Hello</p>

                 </div>
                 
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/*<Deposits />*/}
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
             {/*   <Orders />*/}
              </Paper>
            </Grid>
          </Grid>
        </Container>
        
      </main>
    </div>
  );
}