require('dotenv').config();

const express = require('express');

const router = require('./routes');

const mongoose = require("mongoose");

const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 3000;

const server = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Could not connect to the database', error);
    }
}

server();