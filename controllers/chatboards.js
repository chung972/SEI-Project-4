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
    } catch(err){
        res.status(400).json(err);
    }
}