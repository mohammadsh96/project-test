'use strict';
require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//for testing
const url = `postgres://mohammadsh:0000@localhost:5432/mydatabase`;
const pg =require ('pg');

 const client =new pg.Client(url);

const notFoundHandler = require("./errorHandler/404");
const errorHandler = require("./errorHandler/500");

const signInRouter=require("./route/signin");
const signUpRouter=require("./route/signup");
const secretRouter=require("./route/secret");
const getUsersRouters=require("./route/allUsers");
const aclRouter =require("./route/acl.route");
const router =require("./route/router");
const newrouter =require("./route/newrouter");

app.get("/" , handleHome)


//for testing 
app.get("/houseSingle/:category", handeldata)
// app.get("/post", handelpost)
// app.post("/post", handeladdPost)

app.use(express.json());
app.use(signInRouter);
app.use(signUpRouter);
app.use(secretRouter);
app.use(getUsersRouters);
app.use(aclRouter);
app.use(router);
app.use(newrouter);

function handleHome(req ,res){
res.send("welcome to home page")


}

client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })

function handeldata(req ,res ){
    let category=req.params.category;
    let value=[category]
    let sql = 'select * from houses where category=$1 ;'
client.query(sql,value).then((results)=>{

    
    res.send(results.rows);
}).catch((err)=>{

console.log(err);

})

}
function handelpost(req ,res ){
   
   
    let sql = 'select * from posts ;'
client.query(sql).then((results)=>{

    
    res.send(results.rows);
}).catch((err)=>{

console.log(err);

})

}
// function handeladdPost(req ,res ){
//     let username =req.body.username;
//     console.log("🔥😆😆😆🔥",username);
  
//     let { category, describtion, area,location,price,owner,phone,email,profileImg} = req.body;
//    let values =[username, category, describtion, area,location,price,owner,phone,email,profileImg];
//    let sql = "INSERT INTO posts (username, category, describtion, area , location ,price ,owner, phone ,email,profileImg ) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)RETURNING*;" 
// client.query(sql,values).then((results)=>{

    
//     res.send(results.rows);
// }).catch((err)=>{

// console.log(err);

// })

// }

app.use("*", notFoundHandler);
app.use(errorHandler); 

function start() {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};