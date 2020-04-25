import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { UserIsAuthenticated } from '../../features/auth/authWrapper.jsx';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard.jsx';
import NavBar from '../../features/nav/NavBar/NavBar.jsx';
import HomePage from '../../features/home/HomePage.jsx';
import EventForm from '../../features/event/EventForm/EventForm.jsx';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage.jsx';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard.jsx';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage.jsx';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard.jsx';
import TestComponent from '../../features/testarea/TestComponent.jsx';
import ModalManager from '../../features/modals/ModalManager.jsx';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/events" component={EventDashboard} />
                  <Route path="/events/:id" component={EventDetailedPage} />
                  <Route
                    path="/people"
                    component={UserIsAuthenticated(PeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthenticated(UserDetailedPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthenticated(SettingsDashboard)}
                  />
                  <Route
                    path={['/createEvent', '/manage/:id']}
                    component={UserIsAuthenticated(EventForm)}
                  />
                  <Route path="/test" component={TestComponent} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}
export default withRouter(App);
