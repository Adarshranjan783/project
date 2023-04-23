//jshint esversion:6
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { performance } = require('perf_hooks');
const { update } = require('lodash');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/Assignment", {useNewUrlParser: true});

const signSchema = {
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
};

const gameSchema = {
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  level : {
    type : Number,
    required : true
  },
  entrytime : {
    type : Number,
    required : true
  },
  presenttime : {
    type : Number,
    required : true
  },
  timetaken :{
    type : Number,
    required : true
  },
  points :{
    type : Number,
    required : true
  }
};



const Register = mongoose.model("Register", signSchema);
const Game = mongoose.model("Game", gameSchema);


var level1 ="The more you look at it, the less you see. What is it?";
var level1ans = "darkness";

var level2 ="I am something people love or hate. I change peoples appearances and thoughts. If a person takes care of themselves, I will go up even higher. To some people, I will fool them. To others, I am a mystery. What am I?";
var level2ans = "reputation";

var level3 ="What is it that goes up, but never comes down?";
var level3ans = "age";
// for(var i=0;i<level1.length;i++)
// {
//   console.log(level1[i]);
//   console.log(level1ans[i]);
// }


app.get("/", async (req, res) => {
  try {
    
    res.render("home");
  } catch (err) {
    console.log(err);
  }
});

app.get("/restart/:email", async (req, res) => {
  try {
    const email = req.params.email;
    await Game.updateOne({email : email},{
      level : 1,
    timetaken : 0,
    points :0,
    entrytime : new Date().getTime(),
    presenttime : new Date().getTime()
    });

    res.redirect("/gamepage/"+email);
    
  } catch (err) {
    console.log(err);
  }
});

app.get("/level5/:email", async (req, res) => {
  try {
    const email = req.params.email;
    await Game.updateOne({email : email},{
      level : 5
    });
    res.render("level5",{
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/level5complete/:email", async (req, res) => {
  try {
    // const email = req.params.email;
    // await Game.updateOne({email : email},{
    //   level : 6
    // });
    const email = req.params.email;
    const posts = await Game.findOne({
        email: email
    } );
    var x=posts.points;
    x=x+20;
    await Game.updateOne({email : email},{
      level : 6,
      points : x
    });
    res.redirect("/congratulation/"+email);
  } catch (err) {
    console.log(err);
  }
});


app.get("/congratulation/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const posts = await Game.findOne({
      email: email
   });
    res.render("congratulation",{
      email : email,
      posts : posts
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/level1/:email", async (req, res) => {
  try {
    const email = req.params.email;
    res.render("level1",{
      level1 : level1,
      level1ans : level1ans,
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});






app.get("/level2/:email", async (req, res) => {
  try {
    const email = req.params.email;
    res.render("level2",{
      level2 : level2,
      level2ans : level2ans,
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});


app.get("/level3/:email", async (req, res) => {
  try {
    const email = req.params.email;
    res.render("level3",{
      level3 : level3,
      level3ans : level3ans,
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/level4/:email", async (req, res) => {
  try {
    const email = req.params.email;
    res.render("level4",{
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/failure1/:email", async (req, res) => {
  try {
    const email = req.params.email;
    res.render("failure1",{
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/failure2/:email", async (req, res) => {
  try {
    const email = req.params.email;
    res.render("failure2",{
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/failure3/:email", async (req, res) => {
  try {
    const email = req.params.email;
    res.render("failure3",{
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/about", async (req, res) => {
  try {
    
    res.render("about");
  } catch (err) {
    console.log(err);
  }
});

app.get("/admin", async (req, res) => {
  try {
    const all = await Game.find({ });
    console.log(all);
    res.render("admin",{
      all : all
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/contact", async (req, res) => {
  try {
    
    res.render("contact");
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", async (req, res) => {
  try {
    
    res.render("login");
  } catch (err) {
    console.log(err);
  }
});

app.get("/gamepage/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const posts = await Game.findOne({
      email: email
   });
    
    
    //console.log(email);
    // console.log(posts.timetaken);
    res.render("gamepage",{
     posts : posts,
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/continue/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const posts = await Game.findOne({
      email: email
   } );

    var x= posts.level;
    //console.log(x);
    
    // console.log(typeof timetaken);
    // console.log(posts.timetaken);
    res.redirect("/level"+x+"/"+email);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async(req,res)=>{
  try{
      const email = req.body.email;
      const password = req.body.password;

      const usermail = await Register.findOne({email:email});
      if(usermail == null){
        res.send("Invalid Login Details");
      }else if(usermail.password === password){

        if(email === "admin@gmail.com"){
          console.log("hii");
          res.redirect("/admin");
        }
        else{
          const posts = await Game.findOne({
            email: email
         } );
  
        //  console.log(posts.entrytime);
        //  console.log(new Date().getTime());
         var timetakens = (new Date().getTime()) - posts.entrytime;
         //console.log(timetakens);
  
  
  
          await Game.updateOne({email : email},{
            presenttime :  new Date().getTime(),
            timetaken : timetakens
          });
  
          res.redirect("/gamepage/" + email);
        }
        
        
      }else{
        res.send("Invalid Login Details");
      }

      
      
  }
  catch(err)
  {
    console.log(err);
  }
});

app.post("/level1/:email", async(req,res)=>{
  try{
      const email = req.params.email;
      const ans = req.body.ans;
      if(ans===level1ans)
      {
        const posts = await Game.findOne({
          email: email
       } );
       var x=posts.points;
       x=x+2;
        await Game.updateOne({email : email},{
          level : 2,
          points : x
        });
        res.redirect("/level2/"+email);
      }
      else{
        res.redirect("/failure1/"+email);
      }

      
      
  }
  catch(err)
  {
    console.log(err);
  }
});

app.post("/level2/:email", async(req,res)=>{
  try{
      const email = req.params.email;
      const ans = req.body.ans;
      if(ans===level2ans)
      {
        const posts = await Game.findOne({
          email: email
       } );
       var x=posts.points;
       x=x+4;
        await Game.updateOne({email : email},{
          level : 3,
          points : x
        });
        res.redirect("/level3/"+email);
      }
      else{
        res.redirect("/failure2/"+email);
      }

      
      
  }
  catch(err)
  {
    console.log(err);
  }
});


app.get("/level4complete/:email", async(req,res)=>{
  try{
      const email = req.params.email;
      const posts = await Game.findOne({
          email: email
      } );
      var x=posts.points;
      x=x+10;
      await Game.updateOne({email : email},{
        level : 5,
        points : x
      });
      res.redirect("/level5/"+email);
      
  }
  catch(err)
  {
    console.log(err);
  }
});


app.post("/level3/:email", async(req,res)=>{
  try{
      const email = req.params.email;
      const ans = req.body.ans;
      if(ans===level3ans)
      {
        const posts = await Game.findOne({
          email: email
       } );
       var x=posts.points;
       x=x+6;
        await Game.updateOne({email : email},{
          level : 4,
          points : x
        });
        res.redirect("/level4/"+email);
      }
      else{
        res.redirect("/failure3/"+email);
      }

      
      
  }
  catch(err)
  {
    console.log(err);
  }
});



app.get("/register", async (req, res) => {
  try {
    //const posts = await Post.find({ });
    res.render("register");
  } catch (err) {
    console.log(err);
  }
});

app.get("/leaderboard/:email", async (req, res) => {
  try {
    var email = req.params.email;
    var posts = await Game
    .find()
    .sort({level : -1 ,points : -1, timetaken : 1});
    //posts.sort(([a, b], [c, d]) => c - a || b - d);
    console.log(posts);
    res.render("leaderboard",{
      posts : posts,
      email : email
    });
  } catch (err) {
    console.log(err);
  }
});



app.post("/register",async (req,res) => {

  
  const post = new Register ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  

  const game = new Game ({
    name: req.body.name,
    email: req.body.email,
    level : 1,
    timetaken : 0,
    points :0,
    entrytime : new Date().getTime(),
    presenttime : new Date().getTime()

  });

  game.save().then(()=>{
    post.save().then(()=>{
      res.redirect("/login");
    }).catch((err)=>{
      console.log(err);
    });
  }).catch((err)=>{
    console.log(err);
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
