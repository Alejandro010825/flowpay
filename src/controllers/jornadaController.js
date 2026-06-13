const Jornada = require('../models/jornadaModel');

exports.abrirJornada = async (req, res) => {
    const { usuario_id, monto_inversion } = req.body;

    if (!usuario_id || monto_inversion === undefined) {
        return res.status(400).json({ ok: false, msg: 'El ID de usuario y el monto de inversión son obligatorios' });
    }

    try {
        const jornadaActiva = await Jornada.findActiveByUserId(usuario_id);
        if (jornadaActiva) {
            return res.status(400).json({ 
                ok: false, 
                msg: 'Ya tienes una jornada activa en curso. Debes cerrarla antes de iniciar una nueva.',
                jornada: jornadaActiva
            });
        }

        const result = await Jornada.create(usuario_id, monto_inversion);

        return res.status(201).json({
            ok: true,
            msg: '¡Jornada iniciada con éxito! Ya puedes empezar a vender.',
            jornadaId: result.insertId
        });

    } catch (error) {
        console.error('Error al abrir jornada:', error);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor al abrir la jornada' });
    }
};

exports.verificarEstado = async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const jornadaActiva = await Jornada.findActiveByUserId(usuario_id);
        
        if (jornadaActiva) {
            return res.status(200).json({ ok: true, tieneJornadaActiva: true, jornada: jornadaActiva });
        } else {
            return res.status(200).json({ ok: true, tieneJornadaActiva: false, msg: 'Se requiere abrir jornada (Inversión obligatoria)' });
        }
    } catch (error) {
        console.error('Error al verificar estado:', error);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor al verificar estado' });
    }
};