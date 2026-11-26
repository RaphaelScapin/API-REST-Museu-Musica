const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const chaveJWT = process.env.JWT_SECRET || null
const usuarioRepository = require('../repositories/usuario.repository')

async function login(req, res, next) {
    try {
        const usuario = await usuarioRepository.buscarParaLogin(req.body.email)
        const senhaCorreta = usuario && await bcrypt.compare(req.body.senha, usuario.senha_hash)

        if (!senhaCorreta || usuario.status !== 'ativo') {
            return res.status(401).json({ erro: 'email ou senha inválidos!' })
        }

        const token = jwt.sign({}, chaveJWT, {
            subject: usuario.id_usuario,
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        })
        return res.json({ token, tipo: 'Bearer' })
    } catch (erro) { return next(erro) }
}

module.exports = { login }