const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars').engine;
const path = require('path');

const app = express();
const port = 3000;

const router = require('./routes')
const db = require('./config/db')

//connect DB
db.connect();

app.use(express.static(path.join(__dirname,'public')))

// Middleware
app.use(express.urlencoded({
   extended:true
}))
app.use(express.json())

// HTTP LOGGER
app.use(morgan('combined'));

// Template engine
app.engine('hbs', exphbs({
  extname:'.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 
path.join(__dirname, 'resources/views'));

router(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
