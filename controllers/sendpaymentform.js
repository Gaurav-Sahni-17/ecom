module.exports = function (req, res) {
    if (req.session.user.role === "user") {
        res.render("paymentform", { email: req.session.user.email });
    }
    else {
        res.render("access");
    }
}