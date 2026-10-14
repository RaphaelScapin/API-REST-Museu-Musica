const express = require('express')
const exposicaoController = require('../controllers/exposicao.controller')
const { validarExposicao } = require('../validators/exposicao.validator')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', exposicaoController.listar)
router.get('/:id', exposicaoController.buscarPorId)
router.post('/', validarExposicao, validarResultado, exposicaoController.criar)
router.put('/:id', validarExposicao, validarResultado, exposicaoController.atualizar)
router.delete('/:id', exposicaoController.remover)

module.exports = router