const sendMail=require("../mailmethods/sendEmail.js");
const db=require ('../dbmethods/db.js');
const pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}";
module.exports=function(req,res){
    if(req.body.new==="" && req.body.confirm==="")
    {
        res.render("password",{err: "Please Fill All Details"});
    }
    else{
    if(req.body.new.match(pattern) && req.body.confirm.match(pattern))
    {
    if(req.body.new===req.body.confirm)
    {
        db.query("update user set password=? where email=?",[req.body.new,req.session.user.email],(err,result)=>{
            if(result.affectedRows)
            {
                req.session.isloggedin=false;
            res.redirect("/login");
            let subject='change password';
            let text='Password changed successfully';
            let html="<h1>Your password has been changed successfully</h1>";
            sendMail(req.session.user.email,subject,text,html,function(err,data){
                if(err)
                {
                   throw err;
                }
            })
            }
        })
    }
    else{
       res.render("password",{err: "Passwords don't match"})
    }
}
else{
    res.render("password",{err: "Password too weak"})
}
    }
}