const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.json());

// database connection
const dbURI = 