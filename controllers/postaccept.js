const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id}=req.body;
      db.query("Update product set approved=? where id=?",[1,id],(err,result)=>{
            res.end();
          })
}