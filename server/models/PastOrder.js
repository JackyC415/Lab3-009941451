const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PastOrderSchema = new Schema({
    order_name: {
        type: String,
        trim: true,
        default: ""
    },
    order_quantity: {
        type: Number,
        default: 0
    },
    order_price: {
        type: Number,
        default: 0
    },
    order_status: {
        type: String,
        default: "Cancelled"
    },
    owner: {
        type: String
    },
    buyer: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = PastOrders = mongoose.model('PastOrder', PastOrderSchema);