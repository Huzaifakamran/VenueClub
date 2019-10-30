import React, { Component } from 'react';
import './resources/styles.css';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './components/header-footer/Register';
import Privacy from './components/PrivacyPolicy/Privacy';
import Owner from './components/Dashboard/Owner/OwnerClass';
import Admin from './components/Dashboard/Admin/Admin';
import MessageToAdmin from './components/Dashboard/Owner/AdminMessage';
import Setting from './components/Dashboard/Owner/setting';
import Card from './components/Dashboard/Owner/Card';
import HallDetails from './components/Dashboard/Owner/HallDetails';
import OwnerBooking from './components/Dashboard/Owner/OwnerBooking';
import OwnerChat from './components/Dashboard/Owner/OwnerChat';
import SearchResult from './components/SearchResult/SearchResult';
import UserDashboard from './components/Dashboard/User/UserClass';
import UserSetting from './components/Dashboard/User/setting';
import AdminSetting from './components/Dashboard/Admin/Setting';
import UserChat from './components/Dashboard/User/UserChat';
import ContactUs from './components/Dashboard/User/ContactUs';
import ForgotPassword from './components/Forgot/ForgotPassword';
import SecurityQuestion from './components/Forgot/SecurityQuestion';
import TermsAndCondition from './components/TermsAndCondition/Terms';
import ContactusOwner from './components/Dashboard/Owner/Contactus';
import ViewVenue from './components/ViewVenue/ViewVenue';
import myVenueView from './components/Dashboard/Owner/ViewVenue';
import EditVenue from './components/Dashboard/Owner/EditVenue';
import AdminRegisteredHalls from './components/Dashboard/Admin/RegisteredHalls';
import AdminUsers from './components/Dashboard/Admin/Users';
import AdminBookings from './components/Dashboard/Admin/Bookings';

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => isLoggedIn === true ? (
        <Component {...props} />
      ) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
      }
    />
  );
}


class App extends Component {
  constructor() {
    super()

    this.state = {
      isLoggedIn: false,
      user: null,
    }

  }

  UNSAFE_componentWillMount() {
    const user = sessionStorage.getItem('user')
    if (user) {
      this.setState({ isLoggedIn: true, user })
    }
  }

  render() {
    return (

      <Router>
        <Switch>
          {/* <Route exact path="/" component={Check}/> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/RegisterHall" component={Register} />
          <Route exact path="/PrivacyPolicy" component={Privacy} />
          <Route exact path="/TermsAndCondition" component={TermsAndCondition} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/OwnerDashboard" component={Owner} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/userDashboard" component={UserDashboard} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/OwnerDashboard/booking" component={OwnerBooking} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/OwnerDashboard/chat" component={OwnerChat} />
           <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/myVenueView" component={myVenueView} />{/*C*/}
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/editVenue" component={EditVenue} /> {/*C*/}
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/user/chat" component={UserChat} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/user/contactUs" component={ContactUs} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/owner/Contactus" component={ContactusOwner} />
         
          <Route exact path="/ForgotPassword" component={ForgotPassword} />
          <Route exact path="/ForgotPassword/Security" component={SecurityQuestion} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/AdminDashboard" component={Admin} />
          <Route exact path="/AdminMessage" component={MessageToAdmin} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/OwnerDashboard/setting" component={Setting} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/userDashboard/setting" component={UserSetting} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/adminDashboard/setting" component={AdminSetting} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/adminDashboard/RegisteredHalls" component={AdminRegisteredHalls} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/adminDashboard/Users" component={AdminUsers} />
          <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/adminDashboard/Bookings" component={AdminBookings} />

          <Route exact path="/searchResult" component={SearchResult} />
          <Route exact path="/OwnerDashboard/Card" component={Card} />
          <Route exact path="/HallDetails" component={HallDetails} />
           <Route exact path="/viewVenue" component={ViewVenue} />    {/*C*/}



          <Redirect to="/404" />
        </Switch>

      </Router>
    );
  }
}
export default App;
