const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const sudokus = require('./routes/api/sudokus');
const users = require('./routes/api/users');


const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/sudokus', sudokus);
app.use('/api/users', users);

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));