
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware لتحليل JSON
app.use(express.json());

// استخدام المسارات
app.use('/api/users', userRoutes);

module.exports = app;
