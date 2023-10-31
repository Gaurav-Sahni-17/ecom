const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id,product_id,quantity}=req.body;
  db.query("Update orders set status=? where order_id=?",["Cancelled",id],(err,result)=>{
    if(result.affectedRows)
    {
        db.query("select quantity from product where id=?",[product_id],(err,result1)=>{
            let quan=result1[0].quantity;
            db.query("update product set quantity=? where id=?",[quan+quantity,product_id],(err,result)=>{
                res.end();
            })
        })
    }
  })
}