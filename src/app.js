const express = require('express');
const cors = require('cors');  
const pool = require('./config/db');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ 
        estado: "servidor corriendo",
        proyecto: "FlowPay",
        fecha_servidor: new Date(),
        cesar: "alejandro"
    });
});

module.exports = app;