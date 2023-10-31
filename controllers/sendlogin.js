module.exports=function(req,res){
    if(req.session.isloggedin)
    {
        let role=req.session.user.role;
        if(role==='seller')
        {
            res.redirect("/seller");
        }
        else if(role==="admin")
        {
            res.redirect("/admin");
        }
        else if(role==="state")
        {
            res.redirect("/state");
        }
        else if(role==="city")
        {
            res.redirect("/city");
        }
        else if(role==="user"){
            res.redirect("/product");
        }
        else{
            res.render("login",{data:""})
        }
    }
    else{
        res.render("login",{data:""})
    }
}