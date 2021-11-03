const express = require('express');
const consign = require('consign')
const cors = require('cors');

require('dotenv').config({
    path: process.env.NODE_ENV === "developer" ? "config/.env.developer" : "config/.env"
})

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

consign()
    .include('src/models')
    .include('src/services')
    .then('src/routers')
    .into(app);

module.exports = app;
