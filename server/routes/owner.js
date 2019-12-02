const Menus = require("../models/Menu");
const Order = require('../models/Order');
const Inbox = require("../models/Inbox");
const PastOrder = require('../models/PastOrder');

exports.getOwnerMenu = (req, res) => {

    Menus.find({ owner_id: req.session.ID }, (err, items) => {
        if (err) {
            throw err;
        } else if (items) {
            res.status(200).send(items);
        } else {
            return res.status(404).send("No items on the menu!");
        }
    });
};

exports.removeItem = (req, res) => {
    console.log("INSIDE REMOVE ITEM")
    Menus.findOneAndRemove({ _id: req.params.id }, function (err) {
        if (err) throw err;
        res.status(200).json('Deleted item!');
    });
};

exports.saveItem = (req, res) => {
    console.log('INSIDE ADD ITEM MENU');

    Menus.findOne({ item_name: req.body.item_name, owner_id: req.session.ID }).then(item => {
        if (item) {
            res.status(400).json("Item already exists!");
        } else {
            const newMenuItem = new Menus({
                item_name: req.body.item_name,
                item_desc: req.body.item_desc,
                item_image: req.body.item_image,
                item_quantity: req.body.item_quantity,
                item_price: req.body.item_price,
                item_section: req.body.item_section,
                cuisine: req.body.item_cuisine,
                restaurant_name: req.body.restaurant_name,
                owner_id: req.session.ID
            });
            newMenuItem.save()
                .then(() => res.status(200).json("Item saved!"))
                .catch(err => res.status(400).json(err))
        }
    });
};

exports.updateItem = (req, res) => {
    console.log("INSIDE EDIT ITEM")
    if (!req.session.isLoggedIn) {
        return res.status(400).json("Please login!");
    } else {
        const updateItem = {
            item_name: req.body.item_name,
            item_desc: req.body.item_desc,
            item_image: req.body.item_image,
            item_quantity: req.body.item_quantity,
            item_price: req.body.item_price
        }
        Menus.findOneAndUpdate({ _id: req.body.id }, updateItem, function (err) {
            if (err) throw err;
            res.status(200).json(true);
        });
    }
};

exports.getItemToEdit = (req, res) => {
    console.log("INSIDE EDIT ITEM")
    if (!req.session.isLoggedIn) {
        return res.status(400).json("Please login!");
    } else {
        Menus.findById({ _id: req.params.id }, (err, item) => {
            if (err) {
                throw err;
            } else {
                console.log(item);
                res.status(200).send(item);
            }
        });
    }
};

exports.getBreakfastMenu = (req, res) => {
    Menus.find({ owner_id: req.session.ID, item_section: 'Breakfast' }, (err, items) => {
        if (err) {
            throw err;
        } else if (items) {
            res.status(200).send(items);
        } else {
            return res.status(404).send("No items on the menu!");
        }
    });
};

exports.getLunchMenu = (req, res) => {
    Menus.find({ owner_id: req.session.ID, item_section: 'Lunch' }, (err, items) => {
        if (err) {
            throw err;
        } else if (items) {
            res.status(200).send(items);
        } else {
            return res.status(404).send("No items on the menu!");
        }
    });
};

exports.getAppetizerMenu = (req, res) => {
    Menus.find({ owner_id: req.session.ID, item_section: 'Appetizer' }, (err, items) => {
        if (err) {
            throw err;
        } else if (items) {
            res.status(200).send(items);
        } else {
            return res.status(404).send("No items on the menu!");
        }
    });
};

exports.viewMessages = (req, res) => {
    console.log("INSIDE VIEW MESSAGES...");

    Inbox.find({ owner: req.session.ID, sentBy: "buyer" }, (err, msgs) => {
        if (err) {
            throw err;
        } else if (msgs) {
            console.log(msgs);
            res.status(200).send(msgs);
        } else {
            res.status(404).send("No messages in inbox!");
        }
    });
};

exports.viewOrders = (req, res) => {
    console.log("INSIDE VIEW ORDERS");
    Order.find({ owner: req.session.ID }, (err, items) => {
        if (err) {
            throw err;
        } else if (items) {
            res.status(200).send(items);
        } else {
            return res.status(404).send("No orders!");
        }
    });
};

exports.cancelOrder = (req, res) => {
    console.log("INSIDE CANCEL ORDER");
    Order.findOneAndRemove({ _id: req.params.id }, (err, item) => {
        if (err) {
            throw err;
        } else if (item) {
            const newPastOrder = new PastOrder({
                order_name: item.order_name,
                order_quantity: item.order_quantity,
                order_price: item.order_price,
                owner: item.owner,
                buyer: item.buyer
            });
            newPastOrder.save()
                .then(() => res.status(200).json("Past Order Saved!"))
                .catch(err => res.status(400).json(err))
        } else {
            console.log(item);
            res.status(200).json("Can't find order!");
        }
    });
};

exports.deliverOrder = (req, res) => {
    console.log("INSIDE DELIVER ORDER");
    Order.findOneAndRemove({ _id: req.params.id }, (err, item) => {
        if (err) {
            throw err;
        } else if (item) {
            const newPastOrder = new PastOrder({
                order_name: item.order_name,
                order_quantity: item.order_quantity,
                order_price: item.order_price,
                order_status: "Delivered",
                owner: item.owner,
                buyer: item.buyer
            });
            newPastOrder.save()
                .then(() => res.status(200).json("Past Order Saved!"))
                .catch(err => res.status(400).json(err))
        } else {
            console.log(item);
            res.status(200).json("Can't find order!");
        }
    });
};

exports.replyBuyer = (req, res) => {
    console.log("INSIDE REPLY BUYER...");

    const newReply = new Inbox({
        buyer: req.body.buyer,
        message: req.body.message,
        sentBy: "owner",
        owner: req.session.ID
    });
    newReply.save()
        .then(() => res.status(200).json("Response sent!"))
        .catch(err => res.status(400).json(err))
};