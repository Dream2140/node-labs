require('dotenv').config();

require('./credentials/passport-setup');

const path = require('path');

const express = require('express');

const ejsLayouts = require('express-ejs-layouts');

const passport = require('passport');

const session = require('express-session');

const apiRouter = require('./routes');

const mongoose = require('mongoose');

const morgan = require('morgan');

const PORT = process.env.API_PORT || 3000;

const app = express();

app.use(session({
  secret: process.env.COOKIE_SECRET,
  cookie: { maxAge: Number(process.env.COOKIE_EXP) }}
));

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(ejsLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', apiRouter);


const start = async () => {
  try {

    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();


