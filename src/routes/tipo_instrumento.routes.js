const express = require('express')
const tipoInstrumentoController = require('../controllers/tipo_instrumento.controller')
const { validarTipoInstrumento, validarIdTipoInstrumento } = require('../validators/tipo_instrumento.validator')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', tipoInstrumentoController.listar)

router.get('/:id',
    validarIdTipoInstrumento,
    validarResultado,
    tipoInstrumentoController.buscarPorId
)

router.post('/',
    validarTipoInstrumento,
    validarResultado,
    tipoInstrumentoController.criar
)

router.put('/:id',
    validarIdTipoInstrumento,
    validarTipoInstrumento,
    validarResultado,
    tipoInstrumentoController.atualizar
)

router.delete('/:id',
    validarIdTipoInstrumento,
    validarResultado,
    tipoInstrumentoController.remover
)

module.exports = router
