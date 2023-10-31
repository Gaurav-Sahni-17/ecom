const db = require('../dbmethods/db.js');
module.exports = function (req, res) {
    if (req.body.email === "" || req.body.username === "" || req.body.password === "") {
        res.render("login", { data: "**Please Fill All details" })
    }
    else {
        db.query("Select * from user where email=? and password=?", [req.body.email, req.body.password], (err, result, fields) => {
            if (result.length) {
                result.forEach(user => {
                    if (user.isverified) {
                        req.session.isloggedin = true;
                        req.session.user = user;
                        if (user.role === "seller") {
                            res.redirect("/seller");
                        }
                        else if (user.role === "admin") {
                            res.redirect("/admin");
                        }
                        else if (user.role === "state") {
                            res.redirect("/state");
                        }
                        else if (user.role === "city") {
                            res.redirect("/city");
                        }
                        else if (user.role === "user") {
                            res.redirect("/product");
                        }
                        else {
                            res.render("access")
                        }
                    }
                    else {
                        res.render("verify");
                    }
                });
            }
            else {
                res.render("login", { data: "**Invalid username or password" })
            }
        })
    }
}