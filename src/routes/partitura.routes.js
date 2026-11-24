const express = require('express')
const partituraController = require('../controllers/partitura.controller')
const { validarPartitura } = require('../validators/partitura.validator')
const validarResultado = require('../middleware/validarResultado')
const {autenticarJwt} = require('../middleware/autenticacaoJwt')

const router = express.Router()

router.use(autenticarJwt)
router.get('/', partituraController.listar)
router.get('/:id', partituraController.buscarPorId)
router.post('/', validarPartitura, validarResultado, partituraController.criar)
router.put('/:id', validarPartitura, validarResultado, partituraController.atualizar)
router.delete('/:id', partituraController.remover)

module.exports = router