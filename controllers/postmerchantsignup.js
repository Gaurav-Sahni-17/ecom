const db = require('../dbmethods/db.js');
module.exports = function (req, res) {
    const { username, email, aadhar, gst, brand, password } = req.body;
    const id = Date.now();
    db.query("Select * from user where email=?", [email], (err, result) => {
        if (result.length) {
            res.status(404).end();
        }
        else {
            db.query("Select * from user where email=?", [email], (err, result2) => {
                if(result2.length){
                    res.status(404).end();
                }
                else{
            db.query("Insert into sellers(id,username,email,aadhar,gst,brand,password) values (?,?,?,?,?,?,?)", [id, username, email, aadhar, gst, brand, password], (err, result3) => {
                if (result3.affectedRows) {
                    res.end();
                }
            })
        }})
        }
    })
}