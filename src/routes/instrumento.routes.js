const express = require('express')
const router = express.Router()
const instrumentoController = require('../controllers/instrumento.controller')
const { validarInstrumento } = require('../validators/instrumento.validator')

router.get('/', instrumentoController.listar)
router.get('/:id', instrumentoController.buscarPorId)
router.post('/', validarInstrumento, instrumentoController.criar)
router.put('/:id', validarInstrumento, instrumentoController.atualizar)
router.delete('/:id', instrumentoController.remover)

module.exports = router