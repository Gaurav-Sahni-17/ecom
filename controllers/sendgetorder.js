const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
   db.query("select id,name,price,status,CAST(date AS char) as date,order_id,image,orders.quantity from product inner join orders on product.id=orders.product_id where orders.email=? and status!=?",[req.session.user.email,"Cancelled"],(err,result)=>{
     res.send(result);
})
}