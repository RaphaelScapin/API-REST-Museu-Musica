const express = require('express')
const salaController = require('../controllers/sala.controller')
const { validarSala } = require('../validators/sala.validator')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', salaController.listar)
router.get('/:id', salaController.buscarPorId)
router.post('/', validarSala, validarResultado, salaController.criar)
router.put('/:id', validarSala, validarResultado, salaController.atualizar)
router.delete('/:id', salaController.remover)

module.exports = router