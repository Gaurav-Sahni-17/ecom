module.exports=function(req,res){
    if(req.session.user.role==='admin')
        {
            res.render("admin",{username:req.session.user.username})
        }
    else{
            res.render("access");
        }
}