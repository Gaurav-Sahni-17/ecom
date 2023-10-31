const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id}=req.body;
    db.query("delete from product where id=?",[id],(err,result)=>{
        if(result.affectedRows)
        {
            db.query("delete from cart where product_id=?",[id],(err,result)=>{
                if(result)
                {
                    res.end();
                }
            })
        }
    }) 
}