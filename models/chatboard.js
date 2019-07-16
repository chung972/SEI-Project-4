const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatboardSchema = new Schema({
    movieTitle: {type: String},
    imdbID: {type: String}
}, {
    timestamps: true
})


module.exports = mongoose.model('Chatboard', chatboardSchema);