const Chatboard = require("../models/chatboard");

module.exports = {
    create,
    index
}

async function index (req, res){
    try {
        const chatboards = await Chatboard.find({})
        // console.log("index")
        // console.log(chatboards)
        res.json(chatboards)
    } catch (error) {
        console.log(error)
    }   
}

function create(req, res){
    const chatboard = new Chatboard(req.body);
    try{
        chatboard.save();
        // when you create the room (by saving to mongo), we will, at the same time,
        // also want to create the chatkit room as well
    } catch(err){
        res.status(400).json(err);
    }
}