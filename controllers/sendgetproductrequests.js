const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
      db.query("Select * from product where approved=?",[0],(err,result)=>{
            res.send(result);
          })
}