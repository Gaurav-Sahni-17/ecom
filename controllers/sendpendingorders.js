const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
   db.query("select order_id,status,product_id,name,image,orders.quantity,state,city from orders inner join product on product.id=orders.product_id where orders.status not in(?,?)",["Delivered","Cancelled"],(err,result)=>{
     res.send(result);
})
}