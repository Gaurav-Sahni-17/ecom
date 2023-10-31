const db=require ('../dbmethods/db.js');
const sendMail=require("../mailmethods/sendEmail.js");
module.exports=function(req,res){
    const {id,email,password,username}=req.body;
      db.query("Update sellers set approved=? where id=?",[1,id],(err,result)=>{
            if(result.affectedRows)
            {
                db.query("Insert into user values(?,?,?,?,?,?)",[username,email,password,1,id,"seller"],(err,result2)=>{
                    if(result2.affectedRows)
                    {
                        let text='Congratulations';
                        let subject='You are now a seller';
                        let html=`<h1>Congratulations<h1><h3>We have accepted your request to become a seller</h3>`;
                    sendMail(email,subject,text,html,function(err,data){
                    if(!err)
                       {
                           res.end();
                       }
                    })
                    }
                })
            }
          })
}