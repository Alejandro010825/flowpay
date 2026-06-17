const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const upload = require('../middlewares/uploadMiddleware');

router.post('/registrar', upload.single('imagen'), ventaController.registrarVenta);

module.exports = router;