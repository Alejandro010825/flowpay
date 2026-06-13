const express = require('express');
const cors = require('cors');  
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes'); 
const jornadaRoutes = require('./routes/jornadaRoutes');

const app = express();

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

app.use('/api/auth', authRoutes); 
app.use('/api/jornada', jornadaRoutes);

module.exports = app;