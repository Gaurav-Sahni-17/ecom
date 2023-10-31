const express = require('express');
const session = require('express-session');
const multer = require('multer');
const check = require("./middlewares/checkauth.js");
const upload = multer({ dest: "uploads" })
const db = require("./dbmethods/db.js")
const sendroot = require('./controllers/sendroot.js');
const sendsignup = require('./controllers/sendsignup.js');
const postsignup = require('./controllers/postsignup.js');
const sendlogin = require('./controllers/sendlogin.js');
const postlogin = require('./controllers/postlogin.js');
const sendproduct = require('./controllers/sendproduct.js');
const sendlogout = require('./controllers/sendlogout.js');
const postgetproducts = require('./controllers/postgetproducts.js');
const sendpass = require('./controllers/sendpass.js');
const postpass = require('./controllers/postpass.js');
const sendchangepass = require('./controllers/sendchangepass.js');
const postchangepass = require('./controllers/postchangepass.js');
const postaddtocart = require('./controllers/postaddtocart.js');
const sendgetproducts = require('./controllers/sendgetproducts.js');
const sendviewcart = require('./controllers/sendviewcart.js');
const sendgetcart = require('./controllers/sendgetcart.js');
const verifypassmail = require('./controllers/verifypassmail.js');
const verifymail = require('./controllers/verifymail.js');
const postremovefromcart = require('./controllers/postremovefromcart.js');
const postincrease = require('./controllers/postincrease.js');
const postdecrease = require('./controllers/postdecrease.js');
const sendseller = require('./controllers/sendseller.js');
const postupdateproduct = require('./controllers/postupdateproduct.js');
const postdeleteproduct = require('./controllers/postdeleteproduct.js');
const postaddnewproduct = require('./controllers/postaddnewproduct.js');
const sendclearcart = require('./controllers/sendclearcart.js');
const notfound = require('./controllers/notfound.js');
const printrequest = require('./middlewares/printrequest');
const postsearch = require('./controllers/postsearch.js');
const postpurchase = require('./controllers/postpurchase.js');
const sendorder = require('./controllers/sendorder.js');
const sendgetorder = require('./controllers/sendgetorder.js');
const postcancelorder = require('./controllers/postcancelorder.js');
const sendgetusers = require('./controllers/sendgetusers.js');
const postupdateuser = require('./controllers/postupdateuser.js');
const sendadmin = require('./controllers/sendadmin.js');
const sendgetproductrequests = require('./controllers/sendgetproductrequests.js');
const postreject = require('./controllers/postreject.js');
const postaccept = require('./controllers/postaccept.js');
const sendpaymentform = require('./controllers/sendpaymentform.js');
const sendmanageorders = require('./controllers/sendmanageorders.js');
const sendorderforseller = require('./controllers/sendorderforseller.js');
const sendorderforstate = require('./controllers/sendorderforstate.js');
const postdispatchseller = require('./controllers/postdispatchseller.js');
const postdispatchState = require('./controllers/postdispatchState.js');
const sendstate = require('./controllers/sendstate.js');
const sendorderforcity = require('./controllers/sendorderforcity.js');
const sendorderforuser = require('./controllers/sendorderforuser.js');
const postdispatchcity = require('./controllers/postdispatchcity.js');
const sendcity = require('./controllers/sendcity.js');
const verifyorder = require('./controllers/verifyorder.js');
const sendpendingorders = require('./controllers/sendpendingorders.js');
const senddeliveredorders = require('./controllers/senddeliveredorders.js');
const sendcancelorders = require('./controllers/sendcancelorders.js');
const sendrequests = require('./controllers/sendrequests.js');
const sendpendingsellerrequest = require('./controllers/sendpendingsellerrequest.js');
const sendrejectedsellerrequest = require('./controllers/sendrejectedsellerrequest.js');
const sendsellersignup = require('./controllers/sendsellersignup.js');
const postmerchantsignup = require('./controllers/postmerchantsignup');
const sendbecomeseller = require('./controllers/sendbecomeseller.js');
const postacceptseller = require('./controllers/postacceptseller.js');
const postrejectseller = require('./controllers/postrejectseller.js');
const sendsellerproducts = require('./controllers/sendsellerproducts.js');
const sendsellerreport = require('./controllers/sendsellerreport.js');
const postsellerreport = require('./controllers/postsellerreport.js');
const sendtotalproducts = require('./controllers/sendtotalproducts.js');
const app = express();
app.use(express.json())
app.use(express.static("project/styles"));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use((session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
})))
app.use(printrequest);
app.get("/", sendroot);

app.get("/sendtotalproducts",sendtotalproducts);

app.route("/signup").get(sendsignup).post(postsignup);

app.route("/login").get(sendlogin).post(postlogin);

app.get("/product", sendproduct);

app.get("/logout", sendlogout);

app.post("/purchase", postpurchase);

app.route("/getproducts").get(sendgetproducts).post(postgetproducts);

app.route("/pass").get(sendpass).post(postpass);

app.route("/changepass").get(sendchangepass).post(postchangepass);

app.post("/dispatchstate", postdispatchState);

app.post("/dispatchcity", postdispatchcity);

app.post("/addtocart", check, postaddtocart);

app.get("/viewcart", check, sendviewcart);

app.get("/manageorders", check, sendmanageorders);


app.get("/sellerreport", check, sendsellerreport);

app.post("/sellerreport", postsellerreport);

app.post("/dispatchseller", postdispatchseller);

app.get("/orderforseller", sendorderforseller);

app.get("/orderforstate", sendorderforstate);

app.get("/orderforcity", sendorderforcity);

app.get("/orderforuser", sendorderforuser);

app.get("/state", check, sendstate);

app.get("/city", check, sendcity);

app.get("/paymentform", check, sendpaymentform);

app.get("/getcart", sendgetcart);

app.get("/order", check, sendorder);

app.post("/reject", postreject);

app.post("/accept", postaccept);

app.post("/cancelorder", postcancelorder);

app.get("/getusers", sendgetusers);

app.post("/updateuser", postupdateuser);

app.get("/admin", check, sendadmin);

app.get("/getproductrequests", sendgetproductrequests);

app.get("/getorder", sendgetorder);

app.get("/change/:token", verifypassmail);

app.get("/verifymail/:token", verifymail);

app.get("/verifyorder/:id", verifyorder);

app.get("/pendingorders", sendpendingorders);

app.get("/deliveredorders", senddeliveredorders);

app.get("/sellerreq", check, sendrequests);

app.get("/becomeseller", sendbecomeseller);

app.post("/acceptseller", postacceptseller);

app.post("/rejectseller", postrejectseller);

app.get("/getsellerproducts", sendsellerproducts);

app.post("/merchantsignup", postmerchantsignup);

app.get("/pendingsellerrequest", sendpendingsellerrequest);

app.get("/rejectedsellerrequest", sendrejectedsellerrequest);

app.get("/merchant", sendsellersignup);

app.get("/cancelorders", sendcancelorders);

app.post("/search", postsearch);

app.post("/removefromcart", postremovefromcart);

app.post("/increase", postincrease);

app.post("/decrease", postdecrease);

app.get("/seller", check, sendseller);

app.post("/updateproduct", postupdateproduct);

app.post("/deleteproduct", postdeleteproduct);

app.post("/addnewproduct", upload.single("image"), postaddnewproduct);

app.get("/clearcart", sendclearcart);

app.get("*", notfound);

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("db connected");
    app.listen(8000, () => {
        console.log("Listening at port 8000");
    })
})
