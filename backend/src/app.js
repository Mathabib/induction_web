// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/staff', require('./routes/staffRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
