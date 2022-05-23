const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const connectDB = require("./config/database");
const session = require('express-session')


connectDB();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}))


app.use(express.static("./"));
app.set('view engine', 'hbs');


app.use(session({
    secret: 'mySecret',
    name: 'user',
    resave: true,
    saveUninitialized: false, 
  }))
  

const port = 5000;
app.listen(port, () => console.log(`server running on port ${port}`));

const routers = require('./router/routers')
app.use(routers);
const main = require('./router/main')
app.use(main)
const admin = require('./router/admin')
app.use(admin)

