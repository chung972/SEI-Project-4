import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import userService from "../../utils/userService";
import chatboardService from "../../utils/chatboardService";
// import tokenService from "../../utils/tokenService";
import HomePage from "../../pages/HomePage/HomePage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MoviePage from "../../pages/MoviePage/MoviePage";
import NavBar from "../../components/NavBar/NavBar";
import ChatPage from "../ChatPage/ChatPage";


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),  // go to function declaration for more info
      chatBoards: [],
      idList: []
    }
  }


  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  getAllBoards = () => {
    chatboardService.getAllChatBoards(this.asyncGetBoards, this.asyncAddId);
    // console.log(list);
    // console.log(this.state.chatBoards)
    // console.log("end of getAllBoards");
  }

  asyncGetBoards = (boardList) => {
    this.setState({ chatBoards: boardList })
  }

  asyncAddId = (movieID) => {
    let tempIdList = [...this.state.idList, movieID]
    this.setState({ idList: tempIdList });
  }

  componentDidMount = async () => {
    // because App.js will default to the home page, we call getAllBoards()
    // in componentDidMount, so that the HomePage component gets passed the most
    // up-to-date list of existing chatboards
    await this.getAllBoards();
  }

  render() {
    return (
      // TODO: have a navbar OUTSIDE of the switch 
      <div>
        <header>
          <NavBar
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        </header>
        <Switch>
          <Route exact path="/" render={({ match, history }) =>
            <HomePage
              match={match}
              history={history}
              idList={this.state.idList}
              asyncAddId={this.asyncAddId}
              chatBoards={this.state.chatBoards}
              getAllBoards={this.getAllBoards}
            />
          } />
          <Route exact path="/signup" render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path="/login" render={({ history }) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path="/movies" render={() =>
            <MoviePage
              chatBoards={this.state.chatBoards}
              getAllBoards={this.getAllBoards}
            />
          } />

          <Route exact path="/rooms" render={() =>
            <ChatPage
            />
          } />
        </Switch>

      </div>

    );
  };
}

export default App;
