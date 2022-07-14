`use strict`;
const url = `postgres://mohammadsh:0000@localhost:5432/movies`;
const express = require("express");
const res = require("express/lib/response");
const movieData =require("./data.json");
 require(`dotenv`).config();
 const apikey = process.env.API_KEY;
 const pg =require (`pg`);
 const client =new pg.Client(url);
// const{Client}= require(`pg`);
// const client =new Client(url) ;
 var bodyparser = require('body-parser');
const app = express();
const port = 3017;
const cors = require (`cors`);
const req = require("express/lib/request");
const Client = require("pg/lib/client");
const axios= require("axios").default;
// const { default: axios, Axios } = require("axios");
// app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get("/trending" , handleMovieData);
app.get("/search", handleSearch);
app.get("/", handlehomePage);
app.get("/favorite", HandlefavoritePage);
app.get("/changes", handlechange);
app.get("/dicover", handlediscover);
app.post("/addmovie", handleadd);
app.get("/getmovies",handleGetmovie);
//app.post("/addnewdata" , handleAddNew);
app.put("/UPDATE/:id" , handleUpdate);
app.delete("/DELETE/:id" , handleDelete);
app.get("/getMovie/:id" , handleGetMovieId);
app.use(cors());

// app.use(express.json());



//functions
function  handleGetMovieId(req ,res){
const id = req.params.id;
let value =[id]
    let sql = `SELECT * from movie where id =$1  ;`
    client.query(sql,value).then((results)=>{
    
        // console.log(results);
        res.send(results.rows);
    }).catch(error => {
        res.send("error");
    })
    }    



function handleDelete (req,res)
{
    const newID = req.params.id;
    let value =[newID];
let sql = `DELETE FROM movie WHERE id = $1;`
client.query(sql,value).then(result=>{
    // console.log(result.rows);
    res.send("movie deleted ");
}).catch(error=>{
    res.send("not found");
})


}
function handleUpdate (req ,res){
    const newID = req.params.id;
const {id ,title , time ,summary}=req.body;
let sql= `UPDATE movie
SET id = $1, 
    title = $2, time = $3,summary = $4 where id =$5 RETURNING*; `
let values =[id,title,time,summary,newID];
client.query(sql,values).then(result=>{
    console.log(result.rows);
    res.send(result.rows);
}).catch(error=>{
    res.send("not found");
})

}
// function handleAddNew (req ,res ){




// }
function handleSearch (req ,res){

console.log(req.query.moviename);
let movieName =req.query.moviename;
let url =`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=7a16f189cd47249b76c47f3dcda1137f&language=en-US&query=The&page=2`;
axios.get(url)

.then(result=>{
console.log(result.data.results);
res.json(result.data.results);

})
.catch(error=>{
    res.send("name not found");
});
}
client.connect().then(()=>{
    app.listen(port  , () => {

        console.log(`mohammad on  ${port}`);
        
        });
});

function handlehomePage(req ,res){
let newrecipe = new Resipe (movieData.title , movieData.poster_path , movieData.overview);
res.json(newrecipe);
}

function HandlefavoritePage(req ,res){
    res.send("Welcome to Favorite Page");
    }

 function handleMovieData (req , res ){


let url = `https://api.themoviedb.org/3/trending/all/week?api_key=7a16f189cd47249b76c47f3dcda1137f`;

  axios.get(url)
  
  .then(data => {
// console.log(data.data.results);
let datas =data.data.results.map(datas=>{

    return new MovieData(datas.id , datas.title ,datas.release_date ,datas.poster_path, datas.overview) ;
    
})

res.send(datas);
  })
  .catch(error => {
      res.send(" data not found");
  })
 
    }


    function handlechange(req,res){

let url =`https://api.themoviedb.org/3/movie/changes?api_key=7a16f189cd47249b76c47f3dcda1137f&page=1`;

axios.get(url).then(result=>{
 res.json(result.data.results);

})
.catch(error=>{
    res.send("not found");
})
    }
    function handlediscover (req ,res){
let url =`https://api.themoviedb.org/3/discover/movie?api_key=7a16f189cd47249b76c47f3dcda1137f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
axios.get(url).then(result=>{
    res.json(result.data.results);
   
   })
   .catch(error=>{
       res.send("not found");
   })
    }

function handleadd(req ,res ){
    let id =req.body.id;
    let title = req.body.title;
    let time =req.body.time;
    let summary =req.body.summary;
    
   let values =[id ,title ,time ,summary ];
   let sql = "INSERT INTO movie (id ,title , time ,summary ) VALUES($1,$2,$3,$4)RETURNING*;" 
       client.query(sql,values).then(results=>{
console.log(results.rows);
// return res.send("is on ");
return res.status(201).json(results.rows[0]);

       }).catch(error => {
           res.send("it is error");
       })
// res.send("req is sent  need to fill body ");
// console.log(req.body);

}


function handleGetmovie (req ,res ){
let sql = `SELECT * from movie`
client.query(sql ).then((results)=>{

    // console.log(results);
    res.send(results.rows);
}).catch()
}    


//constructors
function Resipe (title ,poster_path, overview  ){
this.title = title ;
this.poster_path = poster_path ; 
this.overview = overview ;

}
function MovieData ( id , title , release_date ,poster_path ,overview ){
this.id =id ;
this.title =title;
this.release_date = release_date;
this.poster_path = poster_path;
this.overview = overview;
}