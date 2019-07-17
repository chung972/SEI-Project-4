import React, { Component } from "react";
import getMovies from "../../utils/omdb-api";
import { Link } from "react-router-dom";
import chatboardService from "../../utils/chatboardService";

// style the span for (Create Chatroom)
const spanStyle = {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline",
}

class SearchForm extends Component {

    state = {
        movies: [],
        searchTerm: '',
        createState: {
            movieTitle: '',
            imdbID: ''
        }
    }

    handleSubmit = (e) => {
        console.log("in handle submit");
        e.preventDefault();
        if (this.state.searchTerm) {
            // have the if statement above to make sure that the user doesn't try searching with an empty string
            try {
                getMovies(this.state.searchTerm, this.asyncMovieStateUpdate);
                // this.setState({ movies: movieList })
            } catch (err) {
                // Invalid user data (probably duplicate email)
            }
        }
    }

    asyncMovieStateUpdate = (movieList) => {
        this.setState({ movies: movieList });
        // good user experience (UX) is to clear the search bar after they click on the Submit button
        this.setState({ searchTerm: '' });
    }

    componentDidMount = async () => {
        // because App.js will default to the home page, we call getAllBoards()
        // in componentDidMount, so that the HomePage component gets passed the most
        // up-to-date list of existing chatboards
        await this.props.getAllBoards();
    }

    handleChange = (e) => {
        this.setState({
            // leverage ES2015 COMPUTED PROPERTY NAMES; what the line below allows us to do is
            // be able to dynamically take in inputs (of DIFFERENT "name"s) and assign those
            // keys with values
            [e.target.name]: e.target.value
        });
    }

    handleClick = async (movie) => {
        // we only have ONE handleClick method, because if you look at what's being rendered,
        // you'll see the ternary that will append a jsx element at the end of each movie;
        // you will either see a Link to an existing chatroom OR you will have to CREATE a
        // chat room; hence, that is why at the bottom of this function, you see .createChatBoard()
        const tempMovieTitle = movie.Title;
        const movieID = movie.imdbID;
        console.log("you in handleclick in SearchForm");
        console.log(tempMovieTitle);
        await this.setState(prevState => ({
            ...prevState,
            createState: {
                ...prevState.createState,
                movieTitle: tempMovieTitle,
                imdbID: movieID
            }
        }));
        console.log("checking state inside of handleClick in SearchForm");
        console.log(this.state.createState.movieTitle);
        chatboardService.createChatBoard(this.state.createState);
        this.props.history.push(`/movies/${movieID}`);
        // TODO: push the link use imdbID
    }




    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="searchTerm" value={this.state.searchTerm} placeholder="Movie title..." onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>

                <ul>
                    {this.state.movies.map((movie, idx) =>
                        <li key={idx}>
                            {movie.Title} &nbsp;|&nbsp;
                            {this.props.idList.includes(movie.imdbID) ?
                                <Link to={`${this.props.match.url}movies/${movie.imdbID}`}>
                                    Enter Chatroom
                                </Link>
                                :
                                <span
                                    onClick={() => this.handleClick(movie)}
                                    style={spanStyle}
                                >
                                    Create Chatroom
                                </span>
                            }
                        </li>

                    )}
                </ul>
            </div>
        );
    }

}

export default SearchForm;