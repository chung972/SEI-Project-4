import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";

const HomePage = ({match, history, idList, asyncAddId, chatBoards, getAllBoards}) => {
    return (
        <div>
            <h2>Home</h2>
            <SearchForm 
                match={match}
                history={history}
                idList={idList}
                asyncAddId={asyncAddId}
                chatBoards={chatBoards}
                getAllBoards={getAllBoards}
            />
        </div>
    );
}

export default HomePage;