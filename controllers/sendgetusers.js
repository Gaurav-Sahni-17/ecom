const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
      db.query("Select id,username,email,role from user",(err,result)=>{
            res.send(result);
          })
}