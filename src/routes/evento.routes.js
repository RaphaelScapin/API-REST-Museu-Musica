const express = require('express')
const eventoController = require('../controllers/evento.controller')
const { validarEvento, validarIdEvento } = require('../validators/evento.validators')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', eventoController.listar)

router.get('/:id',
    validarIdEvento,
    validarResultado,
    eventoController.buscarPorId
)

router.post('/',
    validarEvento,
    validarResultado,
    eventoController.criar
)

router.put('/:id',
    validarIdEvento,
    validarEvento,
    validarResultado,
    eventoController.atualizar
)

router.delete('/:id',
    validarIdEvento,
    validarResultado,
    eventoController.remover
)

module.exports = router
