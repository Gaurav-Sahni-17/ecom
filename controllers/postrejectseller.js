const db = require('../dbmethods/db.js');
const sendMail = require("../mailmethods/sendEmail.js");
module.exports = function (req, res) {
    const { id, email} = req.body;
    db.query("Delete from sellers where id=?", [id], (err, result) => {
        if (result.affectedRows) {
            let text = 'Your request have been rejected';
            let subject = 'Rejection Message';
            let html = `<h1>Sorry<h1><h3>We are sorry to tell you that your request to become a seller has been rejected</h3>`;
            sendMail(email, subject, text, html, function (err, data) {
                if (!err) {
                    res.end();
                }
            })
        }
    })
}