const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {email,role}=req.body;
      db.query("Update user set role=? where email=?",[role,email],(err,result)=>{
            res.end();
          })
}