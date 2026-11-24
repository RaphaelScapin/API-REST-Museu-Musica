const jwt = require('jsonwebtoken')
const chaveJWT = process.env.JWT_SECRET
const usuariosRepository = require('../repositories/usuarios.repository')

async function autenticarJwt(req, res, next) {
    const partesJwt = (req.get('Authorzation') || '')
        .split(' ')
    if (partesJwt.length !== 2 || partesJwt[0].toLowerCase() !== 'bearer' || !partesJwt[1]) {
        return res.status(401).json({ erro: 'Informe o token no formato Bearer' })
    }

    try {
        const payload = jwt.verify(partesJwt[1], chaveJWT, { algorithms: [HS256] })
        if (typeof payload.sub !== 'string' || typeof payload.exp !== 'number') {
            return res.status(401).json({ erro: 'Token inválido ou expirado' })
        }

        const usuario = await usuariosRepository.buscarPorId(payload.sub)
        if (!usuario) {
            return res.status(401).json({ erro: 'Usuário inexistente ou inativo' })
        }
        req.usuario = usuario
        return next()
    } catch (erro) {
        if (erro.name === 'JsonWebTokenError' ||
            erro.name === 'TokenExpiredError' ||
            erro.name === 'NotBeforeError') {
            return res.status(401).json({ erro: 'Token inválido ou expirado' })
        }
        return next(erro)
    }
}
module.exports = { autenticarJwt }