const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
   db.query("select order_id,product_id,name,image,orders.quantity,state,city from orders inner join product on product.id=orders.product_id where status=?",["Cancelled"],(err,result)=>{ 
    res.send(result);
})
}