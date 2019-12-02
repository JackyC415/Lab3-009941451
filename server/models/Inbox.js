const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InboxSchema = new Schema({
    message: {
        type: String,
        trim: true,
        default: ""
    },
    owner: {
        type: String
    },
    buyer: {
        type: String
    },
    sentBy: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Inbox = mongoose.model('Inbox', InboxSchema);