import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import userService from "../../utils/userService";
// import tokenService from "../../utils/tokenService";
import HomePage from "../../pages/HomePage/HomePage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MoviePage from "../../pages/MoviePage/MoviePage";
import NavBar from "../../components/NavBar/NavBar";
import getMovies from "../../utils/omdb-api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),  // go to function declaration for more info
      movies: [],
      searchTerm: ''

    }
  }

  // componentDidMount() {
  //   const movieList = getMovies()
  //   this.setState({movies:movieList})
  // }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  displayMsg({ username, message, timestamp }) {
    // var node = document.createElement("li");
    // var msbItm = document.createTextNode(`[${timestamp}] ${username} says: ${message}`);
    // node.appendChild(msbItm);
    // msgBoard.appendChild(node);
  }


  handleSubmit = async (e) => {
    console.log("in handle submit");
    e.preventDefault();
    try {
      getMovies(this.state.searchTerm, this.asyncMovieStateUpdate)
      // this.setState({ movies: movieList })
    } catch (err) {
      // Invalid user data (probably duplicate email)
    }
  }

  asyncMovieStateUpdate = (movieList) => {
    this.setState({movies: movieList})
  }

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      // TODO: have a navbar OUTSIDE of the switch 
      <div>
        <header>
          <h1>ReelTalk</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="searchTerm" value={this.state.searchTerm} placeholder="Movie title..." onChange={this.handleChange} />
          <input type="submit" value="Submit"/>
        </form>

        <NavBar
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path="/" render={() =>
            <HomePage
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
          <Route exact path="/movie" render={() =>
            <MoviePage
            />
          } />
        </Switch>

      </div>

    );
  };
}

export default App;
