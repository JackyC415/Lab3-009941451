const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        default: ""
    },
    section: {
        type: String,
        required: true,
        default: ""
    },
    restaurantName: {
        type: String,
        required: true
    },
    owner_id: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Items = mongoose.model('Item', ItemSchema);