const express = require('express')
const app = express()
const port =process.env.PORT  || 8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
     {
          id:uuidv4(),
          user:"apna college",
          purpose:"basic logic building and give direction to the student"
     },
     {
           id:uuidv4(),
         user:"code with harry",
          purpose:"Teach programming languages from basic to advance" 
     },
     {
           id:uuidv4(),
          user:"Love Babbar",
          purpose:"its best channel to learn dsa" 
     }
     
]


app.get("/posts", (req, res) => {
     res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
     res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    res.render("show.ejs",{id,posts});
})

app.post("/posts",(req,res)=>{
    let {user,purpose} = req.body;
    let id=uuidv4();
    posts.push({id,user,purpose});
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
     let {id}=req.params;
     let post=posts.find((p) => id === p.id);  //it contain a specific post with id(through which it searched)
     res.render("edit.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
      let {id}=req.params;
      let newcontent=req.body.purpose;
      let post=posts.find((p) => id === p.id);
      post.purpose=newcontent;
      res.redirect("/posts")
})

app.delete("/posts/:id",(req,res)=>{
     let {id}=req.params;
     posts=posts.filter((p) => id !== p.id);
     res.redirect("/posts");
});
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
