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
                <h3>Chatrooms</h3>
                {this.props.chatBoards.map((chatBoard, idx) =>
                    <ChatBoard
                        key={idx}
                        chatBoard={chatBoard}
                    />
                )}
            </div>
        );
    }
}

export default MoviePage;