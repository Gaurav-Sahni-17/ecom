const sendMail=require("../mailmethods/sendEmail.js");
const db=require ('../dbmethods/db.js');
module.exports=function(req,res){
    if(req.body.email==="")
    {
        res.render("forgot",{data:"**Please Fill All Fields."})
    }
    else{
        db.query("Select * from user where email=?",[req.body.email],(err,result)=>{
            if(result.length)
            {
                let user=result[0];
                let subject='Reset password';
                        let text='Want to reset password';
                        let html=`<h1>Click here to reset your password</h1><a href='http://127.0.0.1:3000/change/${user.mailtoken}'>Click Here</a>`;
                        sendMail(user.email,subject,text,html,function(err,data){
                        if(!err)
                        {
                            req.session.user=user;
                           res.render("mail");
                        }
                        })
            }
            else{
                res.render("forgot",{data:"**Email doesn't exists."})
            }
        })
    }
}