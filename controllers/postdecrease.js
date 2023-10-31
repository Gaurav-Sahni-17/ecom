const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id}=req.body;
    let a;
    db.query("select quantity from cart where product_id=? and email=?",[id,req.session.user.email],(err,result)=>{
        if(result[0].quantity>1)
        {
            a=result[0].quantity-1;  
            db.query("Update cart set quantity=? where product_id=? and email=?",[a,id,req.session.user.email],(err,result)=>{
                if(result.affectedRows)
                {
                    res.send(JSON.stringify(a));
                }
            })
        }
        else{
            res.send(JSON.stringify(1));
        }
    })
}