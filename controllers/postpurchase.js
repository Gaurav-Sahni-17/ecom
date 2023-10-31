const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {email,state,city}=req.body;
    db.query("Select seller_id,product_id,cart.quantity as quantity,product.quantity as prod_quantity from cart join product where email=? and cart.product_id=product.id",[email],(err,result)=>{
        for(let i=0;i<result.length;i++)
        {
            db.query("Insert into orders(email,seller_id,product_id,quantity,state,city) values (?,?,?,?,?,?)",[email,result[i].seller_id,result[i].product_id,result[i].quantity,state,city],(err,result2)=>{
                //db.query("Select quantity from product where id=?",[result[i].product_id],(err,result3)=>{
                    let quantity=result[i].prod_quantity;
                    db.query("Update product set quantity=? where id=?",[quantity-result[i].quantity,result[i].product_id],(err,result4)=>{
                        db.query("Delete from cart where email=?",[req.session.user.email],(err,result5)=>{
                            res.end();
                       })
                    })
                })
          //  })
        }
    })
    res.end();
}