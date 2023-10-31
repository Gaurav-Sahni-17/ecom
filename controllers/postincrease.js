const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id}=req.body;
    let a;
    db.query("select quantity from product where id=?",[id],(err,result)=>{
       a=result[0].quantity;
       db.query("select quantity from cart where product_id=? and email=?",[id,req.session.user.email],(err,result)=>{
        let b=result[0].quantity;
        if(b<a)
        {
             b=b+1;
             db.query("Update cart set quantity=? where product_id=? and email=?",[b,id,req.session.user.email],(err,result)=>{
                if(result.affectedRows)
                {
                    res.send(JSON.stringify(b));
                }
            })
        }
        else{
            res.send(JSON.stringify(b));
        }
       })
    })
}