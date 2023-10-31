const db = require('../dbmethods/db.js');
module.exports = function (req, res) {
    const user = req.session.user;
    db.query("select city from citydetails where id=?", [user.id], (err, result) => {
        let city = result[0].city;
        db.query("select order_id,product_id,city,email,name,image,orders.quantity,state from orders inner join product on product.id=orders.product_id where orders.status=? and orders.city=?", ["Out from city terminal", city], (err, result) => {
            res.send(result);
        })
    })
}