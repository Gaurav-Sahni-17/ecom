const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id}=req.body;
    db.query("Select * from cart where product_id=? and email=?",[id,req.session.user.email],(err,result)=>{
        if(result.length)
        {
            res.end("not");
        }
        else{
            db.query("Insert into cart values(?,?,?)",[req.session.user.email,id,1],(err,result)=>{
                if(result.affectedRows)
                {
                    res.end("done");
                }
            })
        }
    })
}