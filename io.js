const jwt = require("jsonwebtoken");
let io;

module.exports = {
    init
}

function init(http) {
    io = require("socket.io")(http);
    
    io.on("connection", function(socket) {
        // the above opens the connection to io

        socket.on("sendMsg", (data)=>{
            io.emit("displayMsg", data);
        });








    })


}