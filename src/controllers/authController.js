const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
        return res.status(400).json({ ok: false, msg: 'Todos los campos son obligatorios' });
    }

    try {
        // 1. Verificar si el correo ya existe (ahora con await)
        const userExists = await User.findByEmail(correo);
        if (userExists) {
            return res.status(400).json({ ok: false, msg: 'El correo ya está registrado' });
        }

        // 2. Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedContrasena = await bcrypt.hash(contrasena, salt);

        // 3. Guardar en la base de datos (ahora con await)
        await User.create({ nombre, correo, contrasena: hashedContrasena });
        
        return res.status(201).json({ ok: true, msg: 'Usuario registrado con éxito' });

    } catch (error) {
        console.error('Error en el registro:', error);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor al registrar usuario' });
    }
};

exports.login = async (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ ok: false, msg: 'Por favor, ingresa todos los campos' });
    }

    try {
        // 1. Buscar usuario por correo (ahora con await)
        const user = await User.findByEmail(correo);
        if (!user) {
            return res.status(400).json({ ok: false, msg: 'Credenciales incorrectas (Correo no encontrado)' });
        }

        // 2. Verificar contraseña
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(400).json({ ok: false, msg: 'Credenciales incorrectas (Contraseña incorrecta)' });
        }

        // 3. Generar Token JWT
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre },
            process.env.JWT_SECRET || 'firma_secreta_flowpay',
            { expiresIn: '30d' }
        );

        return res.status(200).json({
            ok: true,
            token,
            usuario: {
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                recordatorio_cierre: user.recordatorio_cierre,
                hora_recordatorio: user.hora_recordatorio
            }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor al iniciar sesión' });
    }
};