const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {name,desc,price,quantity}=req.body; 
    let image=req.file.filename,id=Date.now();
    const seller_id=req.session.user.id;
    db.query("Insert into product(id,seller_id,name,price,image,quantity,description) values(?,?,?,?,?,?,?)",[id,seller_id,name,price,image,quantity,desc],(err,result)=>{
            res.end();  
    })
}