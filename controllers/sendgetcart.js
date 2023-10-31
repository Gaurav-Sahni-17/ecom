const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
   db.query("select id,name,price,description,product.quantity as stock,image,cart.quantity from product inner join cart on product.id=cart.product_id where cart.email=?",[req.session.user.email],(err,result)=>{
     res.send(result);
})
}