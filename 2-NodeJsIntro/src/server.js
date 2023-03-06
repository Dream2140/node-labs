const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const routes = require('./routes/index');

app.use('/', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Aplication are working' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
