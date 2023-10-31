module.exports = function (req, res) {
    if (req.session.isloggedin) {
        if (req.session.user.role === "user") {
            res.render("product", { username: req.session.user.username })
        }
        else {
            res.render("access");
        }
    }
    else {
        res.render("product", { username: "Guest" });
    }
}