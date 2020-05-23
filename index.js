const express= require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const app=express();
const date=require(__dirname +'/date.js');


app.set('view engine' , 'ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todoDB",{ useNewUrlParser: true ,  useUnifiedTopology: true } );
const itemsSchema =
{
  name:String,
  createdAt: Date,
  trash: Boolean
};
const Item= mongoose.model("Item",itemsSchema);
app.get("/",function(req,res){
Item.find({trash: false},function(err,founditems){
  if(founditems.length === 0)
  {
    res.render('app', {ListTitle: "Today", newListItems : founditems});
  }
  else{
  res.render('app', {ListTitle: "Today", newListItems : founditems});
  }
});
});
app.post("/",function(req,res){
  console.log('inside /');
let item =req.body.newItem;
if (req.body.list === "Work")
{
  workItems.push(item);
  res.redirect("/work");
}else
{
  items.push(items);
    res.redirect("/");
}
});
app.post("/add",function(req,res){
let reqData = {
  name: req.body.newItem,
  trash: false,
  createdAt: new Date()
}
try {
  Item.create(reqData, (error, result) => {
    if(error) {
      console.log('error',error)
    } else if (result) {
      console.log('result',result);
      res.redirect("/");
    } else {
      console.log('please try later');
    }
  })
} catch (error) {
  console.log(error)
}
});
app.post("/delete",function(req,res){
  console.log('delete',req.body)
  try {
      Item.findOneAndUpdate({_id: req.body.id},{trash: true},{new: true}, function (error, result) {
        if(error) {
          console.log(error);
        } else if (result) {
          console.log(result);
          res.redirect("/");
        }
      })
  } catch(error) {
    console.log(error);
  }
});
app.get("/work",function(req,res){
  res.render("app",{ListTitle:"Work List",newListItems:workItems});
});
app.listen(3000,function(){
  console.log("server is started at 3000");
});
