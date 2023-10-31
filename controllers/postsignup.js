const sendMail=require("../mailmethods/sendEmail.js");
const db=require ('../dbmethods/db.js');
const pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}";
module.exports=function(req,res){
    if(req.body.email==="" || req.body.username==="" || req.body.password==="")
    {
        res.render("signup",{data:"**Please Fill All details"})
    }
    else{
    if(req.body.password.match(pattern))
    {
  req.body.id=Date.now();
  db.query("Select * from user where email=?",[req.body.email],(err,result,fields)=>{
    if(result.length)
    {
        res.render("signup",{data:"**Email Already Exists"});   
    }
    else {
        db.query("Insert into user (username,email,password,id) values (?,?,?,?)",[req.body.username,req.body.email,req.body.password,req.body.id],(err,result,fields)=>{
            if(result.affectedRows)
            {
                let token=req.body.id;
                let text='Wanna buy some awesome products.';
                let subject='verification';
                let html=`<h1>Wanna buy some awesome products.<h1><h3>Click below to verify</h3><a href='http://127.0.0.1:3000/verifymail/${token}'>Click Here</a>`;
            sendMail(req.body.email,subject,text,html,function(err,data){
            if(!err)
               {
                   res.render("mail");
               }
            })
            }
        })
    }
  })
//   let result=finduser({email:req.body.email});
//   result.then((user)=>{
//     if(user)
//     {
//         res.render("signup",{data:"**Email Already Exists"});
//     }
//     else
//     {
//         let result2=createuser(req.body);
//         result2.then((user)=>{
//             if(user)
//             {
//                 let token=req.body.mailtoken;
//                 let text='Wanna buy some awesome products.';
//                 let subject='verification';
//                 let html=`<h1>Wanna buy some awesome products.<h1><h3>Click below to verify</h3><a href='http://127.0.0.1:3000/verifymail/${token}'>Click Here</a>`;
//             sendMail(req.body.email,subject,text,html,function(err,data){
//             if(!err)
//                {
//                    res.end("<h1>Please Check your entered email to proceed</h1>");
//                }
//             })
//         }
//           })
//           .catch((err)=>{
//                 throw err;
//           })
//     }
//   })
}
else{
    res.render("signup",{data:"Password too weak"});
}
    }
}