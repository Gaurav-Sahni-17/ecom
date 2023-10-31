const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
  db.query("delete from cart where email=?",[req.session.user.email],(err,result)=>{
    if(result)
    {
    res.end();
    }
  })
}