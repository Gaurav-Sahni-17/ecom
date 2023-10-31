const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id}=req.body;
    let quantity,price;
   db.query("select quantity from cart where email=? and product_id=?",[req.session.user.email,id],(err,result)=>{
    quantity=result[0].quantity;
    db.query("select price from product where id=?",[id],(err,result)=>{
        price=result[0].price;
        db.query("delete from cart where email=? and product_id=?",[req.session.user.email,id],(err,result)=>{
            res.end(JSON.stringify({quantity:quantity,price:price}))
        })
    })
   })
}