module.exports=function(req,res){
    res.render("order",{username:req.session.user.username});   
}