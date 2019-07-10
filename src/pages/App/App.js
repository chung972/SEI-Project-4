import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import userService from "../../utils/userService";
import tokenService from "../../utils/tokenService";
import HomePage from "../../pages/HomePage/HomePage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import LoginPage from "../../pages/LoginPage/LoginPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()  // go to function declaration for more info

    }
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  render() {
    return (
      // TODO: have a navbar OUTSIDE of the switch 
      <div>
        <header>
          <h1>ReelTalk</h1>
        </header>
        <Switch>
          <Route exact path="/" render={() =>
            <HomePage
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
          }/>
          <Route exact path="/signup" render={({history}) =>
            <SignupPage 
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        </Switch>

      </div>

    );
  };
}

export default App;
