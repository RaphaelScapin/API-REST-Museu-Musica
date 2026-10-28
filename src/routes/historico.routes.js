
const express = require('express')
const router = express.Router()

const historicoController = require('../controllers/historico.controller')
const { validarHistorico } = require('../validators/historico.validator')

router.get('/', historicoController.listar)
router.get('/:id', historicoController.buscarPorId)
router.post('/', validarHistorico, historicoController.criar)
router.put('/:id', validarHistorico, historicoController.atualizar)
router.delete('/:id', historicoController.remover)

module.exports = router
