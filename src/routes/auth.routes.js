const router = require('express').Router()
const { login } = require('../controllers/auth.controller')
const { validarLogin } = require('../validators/usuarios.validator')
const validarResultado = require('../middleware/validarResultado')

router.post('/login', validarLogin, validarResultado, login)

module.exports = router