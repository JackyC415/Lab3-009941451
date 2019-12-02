const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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

module.exports = Orders = mongoose.model('Order', OrderSchema);