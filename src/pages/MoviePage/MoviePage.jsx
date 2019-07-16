import React, { Component } from "react";
import { ChatBoard } from "../../components/ChatBoard/ChatBoard";
import { Link } from "react-router-dom";


class MoviePage extends Component {

    state = {

    }

    async componentDidMount() {
        await this.props.getAllBoards();
    }

    render() {

        return (
            <div>
                {this.props.chatBoards.map((chatBoard, idx)=>
                    <div key={idx}>{chatBoard.movieTitle}</div>
                )}


                <ChatBoard />
            </div>
        );
    }
}

export default MoviePage;