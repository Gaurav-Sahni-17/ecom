const db = require('../dbmethods/db.js');
module.exports = function (req, res) {
    const user=req.session.user;
    if (user.role === "city") {
        db.query("select city from citydetails where id=?", [user.id], (err, result) => {
            let city = result[0].city;
            db.query("select order_id,product_id,city,email,name,image,orders.quantity,state from orders inner join product on product.id=orders.product_id where orders.status=? and orders.city=?", ["Out from state terminal", city], (err, result) => {
                res.send(result);
            })
        })
    }
    else {
        db.query("select state from statedetails where id=?", [user.id], (err, result) => {
            let state = result[0].state;
            db.query("select order_id,product_id,city,name,email,image,orders.quantity,state from orders inner join product on product.id=orders.product_id where orders.status=? and orders.state=?", ["Out from state terminal", state], (err, result) => {
                res.send(result);
            })
        })
    }
}