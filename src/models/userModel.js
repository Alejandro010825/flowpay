const pool = require('../config/db'); 

const User = {
    findByCorreo: async (correo) => {
        const query = 'SELECT * FROM usuarios WHERE correo = ?';
        const [rows] = await pool.query(query, [correo]);
        return rows[0]; 
    },

    create: async (userData) => {
        const query = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [userData.nombre, userData.correo, userData.contrasena]);
        return result;
    },

    createGoogleUser: async (nombre, correo) => {
        const query = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [nombre, correo, 'GOOGLE_AUTH_ACCOUNT']);
        return result.insertId; // Retorna el ID del nuevo usuario creado
    }
};

module.exports = User;