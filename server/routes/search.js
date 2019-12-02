exports.searchItemByName = (req, res) => {
    console.log(req.body.item);
    console.log("INSIDE SEARCH ITEM")
    if (!req.session.isLoggedIn) {
        console.log("Please log in first!");
    } else {
        //find restaurants for the owner who has this item on the menu
        let findRestaurant = "SELECT restaurantname, menu_owner FROM menus m INNER JOIN user u ON m.menu_owner = u.id AND m.p_name = ?";
        connection.query(findRestaurant, [req.body.item], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                console.log(results);
                req.session.ownerID = results[0].menu_owner;
                res.send(results);
            } else {
                res.sendStatus(404);
                console.log("Can't find any menus for this item!");
            }
        });
    }
};

exports.filterItemByName = (req, res) => {
    console.log("INSIDE FILTER PAGE")
    if (req.session.isLoggedIn) {
        let findRestaurant = "SELECT cuisine FROM user u INNER JOIN menus m ON u.id = m.menu_owner GROUP BY cuisine";
        connection.query(findRestaurant, (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                console.log(results);
                res.send(results);
            } else {
                res.sendStatus(404);
                console.log("Can't find any cuisines!");
            }
        });
    } else {
        console.log("Please log in first!");
    }
};