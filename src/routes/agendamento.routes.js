const express = require('express')
const agendamentoController = require('../controllers/agendamento.controller')
const { validarAgendamento } = require('../validators/agendamento.validator')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', agendamentoController.listar)
router.get('/:id', agendamentoController.buscarPorId)
router.post('/', validarAgendamento, validarResultado, agendamentoController.criar)
router.put('/:id', validarAgendamento, validarResultado, agendamentoController.atualizar)
router.delete('/:id', agendamentoController.remover)

module.exports = router