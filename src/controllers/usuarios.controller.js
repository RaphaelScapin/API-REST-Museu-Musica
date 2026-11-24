const bcrypt = require('bcryptjs')
const usuariosRepository = require('../repositories/usuarios.repository')

async function listar(req, res, next) {
    try {
        const dados = await usuariosRepository.listar()
        return res.json({ total: dados.length, dados })
    } catch (erro) { return next(erro) }
}

async function buscarPorId(req, res, next) {
    try {
        const usuario = await usuariosRepository.buscarPorId(req.params.id)
        if (!usuario) return res.status(404).json(
            { erro: 'Usuário não encontrado' }
        )
        return res.json(usuario)
    } catch (erro) { return next(erro) }
}

async function criar(req, res, next) {
    try {
        const { email, senha, status, tipo } = req.body
        const senhaHash = await bcrypt.hash(senha, 12)
        const usuario = await usuariosRepository.criar(
            { email, senhaHash, status, tipo }
        )
        return res.status(201).json(
            { mensagem: 'Usuário criado com sucesso', dados: usuario }
        )
    } catch (erro) { return next(erro) }
}

module.exports = { listar, buscarPorId, criar }