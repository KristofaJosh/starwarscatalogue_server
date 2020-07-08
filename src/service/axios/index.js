const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {'Content-Type': 'application/json',},
});

module.exports = instance;