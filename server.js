const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config/db');

const app         = express();

const port = 8000;
app.use(bodyParser.urlencoded({extended: true}))


//Passing empty objects since no DB

MongoClient.connect(db.url, (err,database) => {
  const mydb = database.db('notable')
  if(err) return console.log(err)
  //Importing routes to our server
  require('./app/routes')(app,mydb);
  app.listen(port,() => {
    console.log("We are live on port" + port);
  })
})
