import React, {Component} from "react";
import {Link} from "react-router-dom";

export class ChatBoard extends Component {
    state = {
        movieTitle: '',
        movieDescription: '',
        chatHistory: []
    }

    componentDidMount() {
        console.log("add a function here that emits a message?")
    }

    render() {
        return(
            <div>
                <Link to={`/movies/${this.props.chatBoard.imdbID}`}>
                    {this.props.chatBoard.movieTitle}
                </Link>
            </div>
        )
    }
}

