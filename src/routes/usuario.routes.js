const router = require('express').Router()
const usuarioController = require('../controllers/usuario.controller')
const { validarCriacaoUsuario, validarIdUsuario, validarAtualizacaoUsuario } = require('../validators/usuario.validator')
const validarResultado = require('../middleware/validarResultado')
const { autenticarJwt } = require('../middleware/autenticacaoJwt')

router.use(autenticarJwt)
router.get('/', usuarioController.listar)
router.get('/:id', validarIdUsuario, validarResultado, usuarioController.buscarPorId)
router.post('/', validarCriacaoUsuario, validarResultado, usuarioController.criar)
router.put('/:id', validarAtualizacaoUsuario, validarResultado, usuarioController.atualizar)
router.delete('/:id', validarCriacaoUsuario, usuarioController.remover)

module.exports = router