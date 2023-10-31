const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id}=req.body;
    db.query("Update orders set status=? where order_id=?",["Out for delivery",id],(err,result)=>{
        if(result.affectedRows)
        {
            res.end();
        }
    })
}