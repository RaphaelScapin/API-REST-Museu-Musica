
const express = require('express')
const router = express.Router()
const instrumentoController = require('../controllers/instrumento.controller')
const { validarInstrumento } = require('../validators/instrumento.validator')
const validarResultado = require('../middleware/validarResultado')
const { autenticarJwt } = require('../middleware/autenticacaoJwt')

router.use(autenticarJwt)

router.get('/', instrumentoController.listar)
router.get('/:id', instrumentoController.buscarPorId)
router.post('/', validarInstrumento, validarResultado, instrumentoController.criar)
router.put('/:id', validarInstrumento, validarResultado, instrumentoController.atualizar)
router.delete('/:id', instrumentoController.remover)

module.exports = router
