const express = require('express')
const visitanteController = require('../controllers/visitante.controller')
const { validarVisitante } = require('../validators/visitante.validator')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', visitanteController.listar)
router.get('/:id', visitanteController.buscarPorId)
router.post('/', validarVisitante, validarResultado, visitanteController.criar)
router.put('/:id', validarVisitante, validarResultado, visitanteController.atualizar)
router.delete('/:id', visitanteController.remover)

module.exports = router