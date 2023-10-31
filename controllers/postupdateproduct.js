const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
     const {id,name,price,quantity,desc}=req.body;
     db.query("Update product set name=?, price=?, quantity=?, description=? where id=?",[name,price,quantity,desc,id],(err,result)=>{
      if(result.affectedRows)
      {
         res.end();
      }
     })
   }