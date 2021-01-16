import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import User from '../User/User';
import * as U from '../../components/TuxComponents/UniversalComponents';
import NavBar from '../../components/NavBar/NavBar';
import CreateActivity from '../CreateActivity/CreateActivity';
// import CreateActivityRefactor from '../CreateActivity/CreateActivityRefactor'
import authService from '../../services/authService';
import Landing from '../Landing/Landing';
import PreviewActivity from '../PreviewActivity/PreviewActivity';
import IndexActivities from '../IndexActivities/IndexActivities';
import CoryTestingGround from '../../pages/CoryTestingGround/CoryTestingGround';
import './App.css';
import PasswordResetRequest from '../PasswordResetRequest/PasswordResetRequest';
import HeuristicsActivity from '../HeuristicsActivity/HeuristicsActivity';
import Manager from '../Manager/Manager';
import Activity from '../Activity/Activity';

// import ReactGA from 'react-ga';

// const trackingId = "" // Google analytics tracking id
// ReactGA.initialize(trackingId)
// ReactGA.set({
//   userId: this.state.user.id
// })

class App extends Component {
  state = { user: authService.getUser() };

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() });
    this.props.history.push('/activity/heuristics');
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <NavBar user={user} handleLogout={this.handleLogout} />

        {/* <U.Main> */}

        {/* write conditional routing to proper homepage depending on user type */}
        {/* only get access to certain pages depending on user type */}
        <Route
          exact
          path="/"
          render={() => (user ? <User user={user} /> : <Landing />)}
        />

        {/* // Signup & Login Routes */}
        <Route
          path="/signup/:groupId?/:email?"
          render={({ history, match }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
              match={match}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />

        {/* // General Routes */}

        <Route exact path="/activities" render={() => <IndexActivities />} />
        {/* <Route exact path="/activities/create" render={() => <CreateActivityRefactor />} /> */}
        <Route exact path="/manager-dashboard" render={() => <Manager />} />
        <Route
          exact
          path="/preview-activity"
          render={({ location }) => <PreviewActivity location={location} />}
        />
        <Route
          exact
          path="/corytestingground"
          render={() => <CoryTestingGround />}
        />
        <Route
          exact
          path="/passwordresetrequest"
          render={() => <PasswordResetRequest />}
        />
        {/* // Heuristics Route */}
        <Route
          exact
          path="/activity/heuristics"
          render={({ history, location }) => <HeuristicsActivity />}
        />
        <Route
          exact
          path="/activity/accessability"
          render={({ history, location }) => <Activity />}
        />
        {/* </U.Main> */}
        {/* // 10 Heuristics sub-routes for sidebar */}
      </>
    );
  }
}

export default App;
