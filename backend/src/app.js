// src/app.js
const express = require('express');
const cors = require('cors'); //untuk gerbang frontend dan backend (agar bisa saling berkomunikasi)
require('dotenv').config();
const app = express(); 

const { register, login } = require('./controllers/authController');


const staffRoutes = require('./routes/staffRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.use(cors());
app.use(express.json());

// Public routes
app.post('/register', register);
app.post('/login', login);



app.use('/staff', staffRoutes);
app.use('/admin', adminRoutes);

app.post('/', (req, res) => {
  res.json(req);
});




app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
