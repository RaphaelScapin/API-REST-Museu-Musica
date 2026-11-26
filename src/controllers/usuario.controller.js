const bcrypt = require('bcryptjs')
const usuarioRepository = require('../repositories/usuario.repository')

async function listar(req, res, next) {
    try {
        const dados = await usuarioRepository.listar()
        return res.json({ total: dados.length, dados })
    } catch (erro) { return next(erro) }
}

async function buscarPorId(req, res, next) {
    try {
        const usuario = await usuarioRepository.buscarPorId(req.params.id)
        if (!usuario) return res.status(404).json(
            { erro: 'Usuário não encontrado' }
        )
        return res.json(usuario)
    } catch (erro) { return next(erro) }
}

async function criar(req, res, next) {
    try {
        const { email, senha, status } = req.body
        const senhaHash = await bcrypt.hash(senha, 12)
        const usuario = await usuarioRepository.criar(
            { email, senhaHash, status }
        )
        return res.status(201).json(
            { mensagem: 'Usuário criado com sucesso', dados: usuario }
        )
    } catch (erro) { return next(erro) }
}

async function atualizar(req, res, next) {
    try {
        const id = req.params.id // UUID é string, não converta

        const dadosUsuario = {
            email: req.body.email,
            status: req.body.status,
        }

        if (req.body.senha !== undefined) {
            dadosUsuario.senhaHash = await bcrypt.hash(req.body.senha, 10)
        }

        const usuario = await usuarioRepository.atualizar(id, dadosUsuario)
        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado para a alteração'
            })
        }
        return res.json({
            mensagem: 'Usuário atualizado com sucesso',
            dados: usuario
        })
    } catch (erro) {
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'Email já cadastrado' })
        }
        return next(erro)
    }
}
async function remover(req, res, next) {
    try {
        const id = req.params.id
        const usuarioRemovido = await usuarioRepository.remover(id)
        if (!usuarioRemovido) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            })
        }
        return res.status(200).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }