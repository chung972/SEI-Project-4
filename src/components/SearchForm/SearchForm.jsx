import React, { Component } from "react";
import getMovies from "../../utils/omdb-api";
import { Link } from "react-router-dom";

class SearchForm extends Component {

    state = {
        movies: [],
        searchTerm: ''
    }

    handleSubmit = async (e) => {
        console.log("in handle submit");
        e.preventDefault();
        if(this.state.searchTerm){
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
        this.setState({searchTerm:''});
    }

    handleChange = (e) => {
        this.setState({
            // Using ES2015 Computed Property Names
            [e.target.name]: e.target.value
        });
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
                        <li key={idx}>{movie.Title}
                            {/* <Link /> */}
                        </li>
                        
                    )}
                </ul>
            </div>
        );
    }

}

export default SearchForm;