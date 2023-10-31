const sendMail=require("../mailmethods/sendEmail.js");
const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    const {id}=req.body;
    db.query("Update orders set status=? where order_id=?",["Out from city terminal",id],(err,result)=>{
        if(result.affectedRows)
        {
            let text='Thanks for Ordering on our website';
            let subject='Order Verification';
            let html=`<h1>Thanks for your order.<h1><h3>Click below to verify the delivery</h3><a href='http://127.0.0.1:3000/verifyorder/${id}'>Click Here</a>`;
        sendMail(req.body.email,subject,text,html,function(err,data){
        if(!err)
           {
            console.log(err);
              res.end();
           }
        })
        }
    })
}