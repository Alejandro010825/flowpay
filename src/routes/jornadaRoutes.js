const express = require('express');
const router = express.Router();
const jornadaController = require('../controllers/jornadaController');

router.post('/abrir', jornadaController.abrirJornada);
router.get('/estado/:usuario_id', jornadaController.verificarEstado);

module.exports = router;