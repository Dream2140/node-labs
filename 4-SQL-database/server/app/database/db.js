const dbConfig = require('./db.config');

const { Pool } = require('pg');

const pool = new Pool(dbConfig);

pool.query(`CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';`)

require('../models/document/document.model')(pool);

require('../models/manager/manager.model')(pool);

pool.connect((err) => {
  if (err) {
    console.error('Error acquiring client', err.stack)
  }
  console.log('Synced db.');
})

module.exports = pool;
