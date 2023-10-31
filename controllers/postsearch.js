const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {value,start,end}=req.body;
    db.query("Select * from product where name LIKE ? && approved=? limit ?,?",["%"+value+"%",1,start,end],(err,result)=>{
      res.send(result);
    })
}