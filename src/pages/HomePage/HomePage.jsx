import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";

const HomePage = ({match, history, idList, asyncAddId, chatBoards}) => {
    return (
        <div>
            <h1>Home</h1>
            <SearchForm 
                match={match}
                history={history}
                idList={idList}
                asyncAddId={asyncAddId}
                chatBoards={chatBoards}
            />
        </div>
    );
}

export default HomePage;