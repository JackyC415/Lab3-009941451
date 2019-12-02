const Orders = require("../models/Order");
const Inbox = require("../models/Inbox");
const PastOrder = require('../models/PastOrder');

exports.getRestaurants = (req, res) => {
    console.log('INSIDE GET RESTAURANTS...');
    Menus.find({ item_name: req.body.item }, (err, items) => {
        if (err) {
            throw err;
        } else if (items) {
            req.session.filter = false;
            req.session.itemName = req.body.item;
            res.status(200).send(items);
        } else {
            return res.status(404).send("No items on the menu!");
        }
    });
};

exports.filterByCuisine = (req, res) => {
    console.log('FILTER BY CUISINE...');
    console.log(req.body.cuisine);
    Menus.find({ cuisine: req.body.cuisine, item_name: req.session.itemName }, (err, items) => {
        if (err) {
            throw err;
        } else if (items) {
            req.session.filter = true;
            req.session.cuisine = req.body.cuisine;
            res.status(200).send(items);
        } else {
            return res.status(404).send("No items on the menu!");
        }
    });
};

exports.orderItem = (req, res) => {
    console.log('INSIDE ORDER ITEM...');

    Menus.findOne({ _id: req.params.id }).then(item => {
        if (item.item_quantity > 0) {
            const newOrder = new Orders({
                order_name: item.item_name,
                order_quantity: req.body.quantity,
                order_price: item.item_price,
                item_section: req.body.item_section,
                buyer: req.session.ID,
                owner: item.owner_id
            });
            newOrder.save()
                .then(() => res.status(200).json("Order saved!"))
                .catch(err => res.status(400).json(err))
        } else {
            res.status(400).json("Out of Stock!");
        }
    });
};

exports.viewCart = (req, res) => {
    console.log('INSIDE VIEW CART...');

    Orders.find({ buyer: req.session.ID }).then(order => {
        if (order) {
            res.status(200).send(order);
        } else {
            res.status(400).json("Can't find any orders!");
        }
    });

};

exports.viewPastOrders = (req, res) => {
    console.log("INSIDE VIEW PAST ORDERS");
    PastOrder.find({ buyer: req.session.ID }, (err, items) => {
        if (err) {
            throw err;
        } else if (items) {
            res.status(200).send(items);
        } else {
            return res.status(404).send("No past orders!");
        }
    });
};

exports.viewSearchItems = (req, res) => {
    console.log('INSIDE VIEW SEARCH ITEMS...')
    if (req.session.filter) {
        Menus.find({ item_name: req.session.itemName, cuisine: req.session.cuisine }, (err, items) => {
            if (err) {
                throw err;
            } else if (items) {
                res.status(200).send(items);
            } else {
                res.status(404).send("No items on the menu!");
            }
        });
    } else {
        Menus.find({ item_name: req.session.itemName }, (err, items) => {
            if (err) {
                throw err;
            } else if (items) {
                res.status(200).send(items);
            } else {
                res.status(404).send("No items on the menu!");
            }
        });
    }
};

exports.messageOwner = (req, res) => {
    console.log('INSIDE SEND MESSAGE...');

    const newMessage = new Inbox({
        message: req.body.message,
        owner: req.body.owner,
        sentBy: "buyer",
        buyer: req.session.ID
    });
    newMessage.save()
        .then(() => res.status(200).json("Message sent!"))
        .catch(err => res.status(400).json(err))
};

exports.viewReply = (req, res) => {
    console.log("INSIDE VIEW REPLY...");

    Inbox.find({ buyer: req.session.ID, sentBy: "owner" }, (err, reply) => {
        if (err) {
            throw err;
        } else if (reply) {
            console.log(reply);
            res.status(200).send(reply);
        } else {
            res.status(404).send("No messages in inbox!");
        }
    });
};