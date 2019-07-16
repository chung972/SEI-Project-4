const BASE_URL = "/api/chatboards/";

function createChatBoard(chatBoard) {
    // console.log(BASE_URL)
    // console.log("you in createChatBoard in chatBoardService");
    // console.log(chatBoard);
    // recall that the restful route for CREATING something is:
    //      router.POST("/posts", cb)
    fetch(BASE_URL, {
        mode: "cors",
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(chatBoard)
    })
    .then(res => {
        console.log(res);
        if (res.ok) return res.json();
        throw new Error('Chatboard already exists!');
    });
    return;
}

function getAllChatBoards(asyncGetBoards){
    fetch(BASE_URL, {
        mode: "cors", 
        method:"GET",
    })
    .then(res => res.json())
    .then(data => asyncGetBoards(data));
    // you resolve the json in the first .then, and then you resolve the PROMISE
    // returned from THAT .then in the SECOND .then (the promise resolves to data);
    // this data object is what we want to pass into asyncGetBoards
    return;
}

export default {
    createChatBoard,
    getAllChatBoards
}