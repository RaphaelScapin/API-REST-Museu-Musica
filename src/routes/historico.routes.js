
const express = require('express')
const { autenticarJwt } = require('../middleware/autenticacaoJwt')
const validarResultado = require('../middleware/validarResultado')
const router = express.Router()

router.use(autenticarJwt)

const historicoController = require('../controllers/historico.controller')
const { validarHistorico } = require('../validators/historico.validator')

router.get('/', historicoController.listar)
router.get('/:id', historicoController.buscarPorId)
router.post('/', validarHistorico, validarResultado, historicoController.criar)
router.put('/:id', validarHistorico, validarResultado, historicoController.atualizar)
router.delete('/:id', historicoController.remover)

module.exports = router
