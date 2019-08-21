var express    = require("express");
var  app = express();
var bodyparser = require("body-parser");
var request = require("request");
// var result = {
//     data  : String 
// };
// var data;
app.use(bodyparser.urlencoded({extended  : true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("./library"));

// app.get("/oops",function(req,res){
//     res.render("test",{data : data});
// });

app.get("/", function(req, res){
   res.redirect("/test");
})
app.get("/home",function(req,res){
   res.render("home");
});
app.get("/test",function(req,res){
//  res.render("home");
   res.render("qr");
});

app.post("/new/:code",function(req,res){
   res.render("code", {data: req.params.code});
});

// 223.225.93.136
app.get("/getLocation", function(req, res){
   res.render("getLocation");
})

app.get("/geolocation",function(req,res){
   var ip = req.query.ip;
   var url = "http://ip-api.com/json/" + ip;
   console.log(url);
 request(url,function(err,response,body){
   if(!err && response.statusCode == 200){
      var data = JSON.parse(body);
      var latitude = String(data["lat"]);
      var longitude = String(data["lon"]);
      res.render("geolocation", {latitude: latitude, longitude: longitude});
   }
 })
});

app.listen(3000,function(req,res){
console.log("The GoTransport Server Has Started! ");
}) ;
