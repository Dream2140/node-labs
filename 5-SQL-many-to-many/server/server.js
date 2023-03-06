const express = require("express");

const cors = require("cors");

const app = express();

const dotenv =require("dotenv");

const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const db = require("./app/database/db");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Aplication are working" });
});

const PORT = process.env.SERVER_PORT;

const routes= require("./app/router");

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});