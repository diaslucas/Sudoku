const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const sudokus = require('./routes/api/sudokus');
const users = require('./routes/api/users');


const app = express();

// Authentication Packages
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);

// BodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
const dbHeroku = process.env.dbURL;

var dbToUse;

// Serve static assets if in prod
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

  dbToUse = dbHeroku;
} else {
  dbToUse = db;
}

// Connect to MongoDB
mongoose
.connect(dbToUse, {useNewUrlParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

const store = new MongoDBStore({
  uri: db,
  collection: 'sudokuSessions'
});

store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

app.use(session({
  secret: 'mjdhvhcwprttxjjz',
  resave: false,
  store: store,
  saveUninitialized: false,
  // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use('/api/sudokus', sudokus);
app.use('/api/users', users);

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));