const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    item_name: {
        type: String,
        trim: true,
        default: ""
    },
    item_desc: {
        type: String,
        trim: true,
        default: ""
    },
    item_image: {
        type: String,
        default: ""
    },
    restaurant_name: {
        type: String,
        default: ""
    },
    cuisine: {
        type: String,
        default: ""
    },
    item_quantity: {
        type: Number,
        default: 0
    },
    item_price: {
        type: Number,
        default: 0
    },
    item_section: {
        type: String,
        default: ""
    },
    owner_id: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Menus = mongoose.model('Menu', MenuSchema);