var express=require("express"),app=express();app.set("port",process.env.PORT||5e3),app.use(express.static(__dirname+"/")),app.use(app.router),app.get("/",function(p,e){e.send("Hello World!")}),app.listen(app.get("port"),function(){console.log("Node app is running at localhost:"+app.get("port"))});