const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const id=req.session.user.id;
    db.query("Select id,name,image,quantity from product where approved=? and seller_id=?",[-1,id],(err,result)=>{
     res.send(result);
})
}