const db = require('../dbmethods/db.js');
module.exports = function (req, res) {

  const { start, end } = req.body;
  console.log(start,end);
  db.query("Select * from product where approved=? limit ?,?", [1, start, end], (err, result) => {
    res.send(result);
  })
}