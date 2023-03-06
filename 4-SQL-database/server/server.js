const express = require('express');

const cors = require('cors');

const app = express();
const dotenv =require('dotenv');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const PORT = 8080;

const routes= require('./app/router');

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});