const visitanteRepository = require('../repositories/visitante.repository')

async function listar(req, res, next) {
    try {
        const visitante = await visitanteRepository.listar()
        return res.json({
            total: visitante.length,
            dados: visitante
        })
    } catch (erro) {
        return next(erro)
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = Number(req.params.id)
        const visitante = await visitanteRepository.buscarPorId(id)
        if (!visitante) {
            return res.status(404).json({
                erro: 'Visitante não encontrado'
            })
        }
        return res.json(visitante)
    } catch (erro) {
        return next(erro)
    }
}

async function criar(req, res, next) {
    try {
        visitante = await visitanteRepository.criar(req.body)
        return res.status(201).json({
            mensagem: 'Visitante cadastrado com sucesso',
            dados: visitante
        })
    } catch (erro) {
        return next(erro)
    }
}

async function atualizar(req, res, next) {
    try {
        const id = Number(req.params.id)
        const visitante = await visitanteRepository.atualizar(id, req.body)
        if (!visitante) {
            return res.status(404).json({
                erro: 'Visitante não encontrado para a alteração'
            })
        }
        return res.json({
            mensagem: 'Visitante atualizado com sucesso',
            dados: visitante
        })
    } catch (erro) {
        return next(erro)
    }
}

async function remover(req, res, next) {
    try {
        const id = Number(req.params.id)
        const visitanteRemovido = await visitanteRepository.remover(id)
        if (!visitanteRemovido) {
            return res.status(404).json({
                erro: 'Visitante não encontrado'
            })
        }
        return res.status(200).send()
    } catch (erro) {
        return next(erro)
    }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover }