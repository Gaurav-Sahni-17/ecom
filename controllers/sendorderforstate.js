const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const user=req.session.user;
    if(user.role==="state")
    {
        db.query("select state from statedetails where id=?",[user.id],(err,result)=>{
            let state=result[0].state;
            db.query("select order_id,product_id,city,email,name,image,orders.quantity,state from orders inner join product on product.id=orders.product_id where orders.status=? and orders.state=?",["Out for delivery",state],(err,result)=>{
                res.send(result);
    })
        })
    }
    else if(user.role==="seller"){
        db.query("select order_id,product_id,city,name,image,email,orders.quantity,state from orders inner join product on product.id=orders.product_id where orders.status=? and orders.seller_id=?",["Out for delivery",user.id],(err,result)=>{
            res.send(result);
})
    }
    else{
        db.query("select city from citydetails where id=?",[user.id],(err,result)=>{
            let city=result[0].city;
            db.query("select order_id,product_id,city,name,image,email,orders.quantity,state from orders inner join product on product.id=orders.product_id where orders.status=? and orders.city=?",["Out for delivery",city],(err,result)=>{
                res.send(result);
    })
})
    }
}