
const historicoRepository = require('../repositories/historico.repository')

async function listar(req, res, next) {
    try {
        const historicos = await historicoRepository.listar()
        return res.json({
            total: historicos.length,
            dados: historicos
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)
        const historico = await historicoRepository.buscarPorId(id)

        if (!historico) {
            return res.status(404).json({
                erro: 'Histórico não encontrado'
            })
        }

        return res.json(historico)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        const historico = await historicoRepository.criar(req.body)

        return res.status(201).json({
            mensagem: 'Histórico cadastrado com sucesso',
            dados: historico
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)
        const historico = await historicoRepository.atualizar(id, req.body)

        if (!historico) {
            return res.status(404).json({
                erro: 'Histórico não encontrado para atualização'
            })
        }

        return res.json({
            mensagem: 'Histórico atualizado com sucesso',
            dados: historico
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)
        const removido = await historicoRepository.remover(id)

        if (!removido) {
            return res.status(404).json({
                erro: 'Histórico não encontrado'
            })
        }

        return res.status(200).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }
