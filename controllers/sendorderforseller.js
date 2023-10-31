const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const user=req.session.user;
    if(user.role==="seller")
    {
   db.query("select order_id,product_id,name,image,email,orders.quantity,state,city from orders inner join product on product.id=orders.product_id where orders.status=? and orders.seller_id=?",["Placed",req.session.user.id],(err,result)=>{
     res.send(result);
})
    }
    else{
        db.query("select state from statedetails where id=?",[user.id],(err,result)=>{
            let state=result[0].state;
            db.query("select order_id,product_id,city,name,email,image,orders.quantity,state from orders inner join product on product.id=orders.product_id where orders.status=? and orders.state=?",["Placed",state],(err,result)=>{
                res.send(result);
            })
        })
    }
}