const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {month,year}=req.body;
    let cancel="Cancelled";
    db.query(`SELECT t1.id,name,ordered,price,image,cancel
    FROM (
        (SELECT
            t1.id,
            t1.name,
            SUM(orders.quantity) as ordered,
            price,
            t1.image
        FROM
            orders
        JOIN product AS t1 ON t1.id = orders.product_id
        WHERE
            orders.seller_id = ?  and monthname(date)=?  and year(date)=?
        GROUP BY
            orders.product_id) as t1
        LEFT JOIN
        (SELECT
            t2.id,
            SUM(orders.quantity) as cancel
        FROM
            orders
        JOIN product AS t2 ON t2.id = orders.product_id
        WHERE  
        orders.seller_id = ?  AND orders.status = ? and monthname(date)=?  and year(date)=? GROUP BY orders.product_id) AS t2 ON t1.id = t2.id
    )`,[req.session.user.id,month,year,req.session.user.id,"Cancelled",month,year],(err,result)=>{
        res.send(result);
    })
}