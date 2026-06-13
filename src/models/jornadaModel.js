const pool = require('../config/db');

const Jornada = {
    findActiveByUserId: async (usuario_id) => {
        const query = "SELECT * FROM jornadas WHERE usuario_id = ? AND estado = 'activa'";
        const [rows] = await pool.query(query, [usuario_id]);
        return rows[0];
    },

    create: async (usuario_id, monto_inversion) => {
        const query = "INSERT INTO jornadas (usuario_id, monto_inversion, estado) VALUES (?, ?, 'activa')";
        const [result] = await pool.query(query, [usuario_id, monto_inversion]);
        return result;
    }
};

module.exports = Jornada;